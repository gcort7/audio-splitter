const { exec } = require("child_process");
const path  = require('path');
const formidable = require('formidable');
const fs = require('fs');

async function splitSongUp(folders){
	return new Promise((resolve, reject) => {
		const audio_path = path.normalize(process.env['MUSIC_PATH']);
		folders['files_names'].forEach(song => {
			command = `spleeter separate -p spleeter:${folders['stems']} -o output ${song}`;
			exec(command, {cwd: audio_path}, (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					reject(error);
				}
				if (stdout) {
					console.log(`stdout: ${stdout}`);
					resolve(stdout);
				}
			});
		});
	})
}

async function saveSongOnDisk(req){
	return new Promise((resolve, reject) => {
		const music_path = path.normalize(process.env['MUSIC_PATH']);
		const form = formidable({ multiples: true });

		form.parse(req)
		.on('fileBegin', function (file, file){
			file.path = path.join(music_path, 'audio_file.mp3');
			resolve(true);
		})
		.on('error', reject);
	}); 
}

async function getOutputFiles(folders){
	return new Promise((resolve, reject) => {
		folders.forEach(song => {
			var folder_name = song.slice(0, -4);
			var output_folder = path.normalize(`${process.env['MUSIC_PATH']}/output/${folder_name}`);
			var outputs = [];
			fs.readdir(output_folder, (err, files) => {
				if (err){
					reject(err);
				}
				files.forEach(file => {
					outputs.push(folder_name + '/' + file);
					if(outputs.length == files.length){
						resolve(outputs);
					}
				});
			});
		});
	});
}

async function downloadYoutubeSong(url){
	return new Promise((resolve, reject) => {
		const audio_path = path.normalize(process.env['MUSIC_PATH']);
		command = `youtube-dl -x --audio-format mp3 --output "audio_file.%(ext)s" ${url}`;
		exec(command, {cwd: audio_path}, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				reject(error);
			}
			if (stdout) {
				console.log(`stdout: ${stdout}`);
				resolve(stdout);
			}
		});
	})
}

module.exports = {
	splitSongUp,
	saveSongOnDisk,
	getOutputFiles,
	downloadYoutubeSong
}
