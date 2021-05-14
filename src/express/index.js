const express = require('express');
const path  = require('path');
// const bodyParser = require('body-parser');
const music_console = require('../api/music_console');
const formidable = require('formidable');

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
			const result = await music_console.saveSongOnDisk(req);
			await music_console.splitSongUp(result);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(result, null, 2));
			return;
		});

		return app;
	}
}