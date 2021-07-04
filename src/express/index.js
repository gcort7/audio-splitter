const express = require('express');
const path  = require('path');
const music_console = require('../api/music_console');
const formidable = require('formidable');

module.exports = {
	async boot() {
		const app = express();
		app.set('view engine', 'ejs');
		app.set('views', path.join(__dirname, 'views'));
		app.use(express.static(path.join(__dirname, 'public')));

		app.get('/', (req, res, next) => {
			res.render('index');
		});

		app.post('/musicHandler', async (req, res, next) => {
			const result = await music_console.saveSongOnDisk(req);
			await music_console.splitSongUp(result);
			// const outputs = await music_console.getOutputFiles(result);
			res.status(201).end();
			// res.render('tracks', { outputs : outputs });
		});	

		app.get('/tracks', (req, res, next) => {
			res.render('tracks');
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