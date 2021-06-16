const express = require('express');
const path  = require('path');
// const bodyParser = require('body-parser');
const music_console = require('../api/music_console');
const formidable = require('formidable');

module.exports = {
	async boot() {
		const app = express();
		app.set('view engine', 'ejs');
		app.set('views', path.join(__dirname, 'views'));
		app.use(express.static(path.join(__dirname, 'public')));

		app.get('/', (req, res) => {
			res.render('index');
		});

		app.post('/musicHandler', async (req, res) => {
			const result = await music_console.saveSongOnDisk(req);
			await music_console.splitSongUp(result);
			const outputs = await music_console.getOutputFiles(result);
			res.render('tracks', { outputs : outputs });
		});

		return app;
	}
}