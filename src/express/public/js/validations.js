Dropzone.options.myDropzone = {
	paramName: "file",
	uploadMultiple: false,
	maxFiles: 1,
	maxFilesize: 10,
	acceptedFiles: "audio/*",
	success: function(file, response){
		window.location.pathname = "/tracks";
	}
  };
// function validations(){
// 	var stems = "";
// 	var checkStems = document.getElementsByName("stems");
// 	checkStems.forEach(stemSelected => {
// 		if(stemSelected.checked){
// 			stems = stemSelected;
// 		}
// 	});

// 	if(!stems){
		
// 	}
// }