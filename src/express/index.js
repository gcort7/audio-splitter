const express = require('express');
const path  = require('path');
// const bodyParser = require('body-parser');
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

		app.post('/musicHandler', async (req, res) => {
			const file_saved = await music_console.saveSongOnDisk(req);
			await music_console.splitSongUp(file_saved, "2");
		});

		return app;
	}
}