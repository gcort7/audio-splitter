const { exec } = require("child_process");
const path  = require('path');
const formidable = require('formidable');

async function splitSongUp(song_data){
	const audio_path = '/usr/src/app/src/express/public/music/';
	song_data['files_names'].forEach(song => {
		command = 'sapleeter separate -p spleeter:' + song_data['stems'] + ' -o output ' + song;
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
	});
}

async function saveSongOnDisk(req){
	return new Promise((resolve, reject) => {
		var result = {
			'stems': null,
			'files_names': []
		};
		const music_path = "/usr/src/app/src/express/public/music/";
		const form = formidable({ multiples: true });

		form.parse(req)
		.on('field', function(stems, stems) {
			result['stems'] = stems;
		})
		.on('fileBegin', function (fileselect, file){
			file.path = path.join(music_path, file.name);
			result['files_names'].push(file.name);
			if(Object.keys(file).length/5 == result['files_names'].length){
				resolve(result);
			}
		})
		.on('error', reject);
	}); 
}

module.exports = {
	splitSongUp,
	saveSongOnDisk
}
