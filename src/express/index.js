const express = require('express');
const path  = require('path');
// const bodyParser = require('body-parser');
const formidable = require('formidable');
const music_console = require('../api/music_console');

module.exports = {
	async boot() {
		const app = express();
		app.set('view engine', 'ejs');
		app.set('views', __dirname + '/views');
		app.use(express.static(__dirname + '/public'));

		app.get('/home', (req, res) => {
			res.render('index');
		});

		app.get('/', (req, res) => {
			res.redirect('/home');
		});

		app.post('/musicHandler', (req, res) => {
			const music_folder = path.join(__dirname, 'public/music/');
			const form = new formidable.IncomingForm();
			form.parse(req);
			form.on('fileBegin', function (name, file){
				file.path = path.join(music_folder, file.name);
			});
			await = music_console.splitSongUp("audio_example.mp3", "2");
		});

		return app;
	}
}