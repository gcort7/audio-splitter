window.addEventListener('load', function () {
	document.querySelector("#splitter").style.visibility = "visible";
	document.querySelector("#loader").style.visibility = "hidden";
});

window.addEventListener('onload', spinner);

const form = document.getElementById('audio_splitter');
form.addEventListener('submit', spinner);

Dropzone.options.myDropzone = {
	paramName: "file",
	uploadMultiple: false,
	maxFiles: 1,
	maxFilesize: 10,
	acceptedFiles: "audio/*",
	timeout: 180000,
	init: function() {
		this.on("drop", function(file) { 
			document.getElementById('submit-button').disabled = true;
		});
		this.on("success", function(file) { 
			document.getElementById('submit-button').disabled = false;
		});
	},
};

function lightMode() {
	var element = document.body;
	element.classList.toggle("light-mode");
}

function spinner() {
	document.querySelector("#loader").style.visibility = "visible";
}
