const { exec } = require("child_process");
const path  = require('path');
const formidable = require('formidable');
const fs = require('fs');

async function splitSongUp(folders){
	return new Promise((resolve, reject) => {
		const audio_path = path.normalize(process.env['MUSIC_PATH']);
		folders['files_names'].forEach(song => {
			command = `spleeter separate -p spleeter:${folders['stems']} -o output ${song}`;
			console.log(command)
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
		var result = {
			'stems': null,
			'files_names': []
		};

		const music_path = path.normalize(process.env['MUSIC_PATH']);
		const form = formidable({ multiples: true });

		form.parse(req)
		.on('field', function(stems, stems) {
			result['stems'] = stems;
		})
		.on('fileBegin', function (file, file){
			file.path = path.join(music_path, file.name);
			result['files_names'].push(file.name);
			resolve(result);
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

module.exports = {
	splitSongUp,
	saveSongOnDisk,
	getOutputFiles
}
