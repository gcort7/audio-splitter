const { exec } = require("child_process");
const path  = require('path');

module.exports = {
	async splitSongUp(song_path, steams){
		audio_path = path.join("../express/public/music/", song_path);
		command = "spleeter separate -p spleeter:" + steams + "stems -o output " + song_path;
		exec(command, (error, stdout, stderr) => {
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
}