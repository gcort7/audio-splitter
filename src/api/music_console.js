const { exec } = require("child_process");
const path  = require('path');
const formidable = require('formidable');

async function splitSongUp(song_name, steams){
	const audio_path = "/usr/src/app/src/express/public/music/";
	command = "spleeter separate -p spleeter:" + steams + "stems -o output " + song_name;
	exec(command, {cwd: audio_path}, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}

async function saveSongOnDisk(req){
	return new Promise((resolve, reject) => {
		const music_path = "/usr/src/app/src/express/public/music/";
		const form = new formidable.IncomingForm();
		form.parse(req);
		form.on('error', reject)
		form.on('fileBegin', function (name, file){
			file.path = path.join(music_path, file.name);
			resolve(file.name);
		});
	}); 
}

module.exports = {
	splitSongUp,
	saveSongOnDisk
}
