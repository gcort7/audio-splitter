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
					alert(element.value);
				}
			});
		});
		this.on("success", function(file) { 
			window.location.pathname = "/tracks/" + file.name;
		});
	},
};

function lightMode() {
	var element = document.body;
	element.classList.toggle("light-mode");
}