const express = require('express');
const path  = require('path');
const music_console = require('../api/music_console');
const bodyParser = require('body-parser')

module.exports = {
	async boot() {
		const app = express();
		app.set('view engine', 'ejs');
		app.set('views', path.join(__dirname, 'views'));
		app.use(express.static(path.join(__dirname, 'public')));
		app.use('/tracks', express.static(path.join(__dirname, 'public')));

		app.use(bodyParser.urlencoded({
			extended: true
		}));

		app.use(bodyParser.json());


		app.get('/', async (req, res, next) => {
			await music_console.removeFilesFromFolder();
			res.render('index');
		});

		app.post('/uploadAudio', async (req, res, next) => {
			await music_console.saveSongOnDisk(req);
			res.status(201).end();
		});

		app.post('/musicHandler', async (req, res, next) => {
			var result = {
				'stems': req.body.stems,
				'files_names': ['audio_file.mp3']
			};

			if(req.body.youtube_url){
				await music_console.downloadYoutubeSong(req.body.youtube_url);
			}

			await music_console.splitSongUp(result);

			const outputs = await music_console.getOutputFiles(result['files_names']);
			res.render('tracks', { outputs : outputs });
		});	

		// this route is only for testing purposes
		app.get('/tracks/:folders', async (req, res, next) => {
			const folders = req.params.folders.split(',')
			const outputs = await music_console.getOutputFiles(folders);
			res.render('tracks', { outputs : outputs });
		});

		app.use((req, res, next) => {
			const error = new Error('Not found, go to: http://localhost:3000/');
			error.status = 404;
			next(error);
		});

		// error handler middleware
		app.use((error, req, res, next) => {
			res.status(error.status || 500).send({
			error: {
				status: error.status || 500,
				message: error.message || 'Internal Server Error',
				},
			});
		});

		return app;
	}
}