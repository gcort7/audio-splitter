Dropzone.options.myDropzone = {
	paramName: "file",
	uploadMultiple: false,
	maxFiles: 1,
	maxFilesize: 10,
	acceptedFiles: "audio/*",
	success: function(file, response){
		window.location.pathname = "/tracks/" + file.name;
	}
  };

  
  function lightMode() {
	var element = document.body;
	element.classList.toggle("light-mode");
  }