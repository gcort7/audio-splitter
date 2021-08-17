Dropzone.options.myDropzone = {
	paramName: "file",
	uploadMultiple: false,
	maxFiles: 1,
	maxFilesize: 10,
	acceptedFiles: "audio/*",
	timeout: 180000,
	init: function() {
		this.on("drop", function(file) { 
			options = document.getElementsByName("stems");
			options.forEach(element => {
				if (element.checked) {
					
				}
			});
		});
		this.on("success", function(file) { 
			alert('the upload was successful...')
		});
	},
};

function lightMode() {
	var element = document.body;
	element.classList.toggle("light-mode");
}