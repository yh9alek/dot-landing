function mostrar(e, querySelector){
	const input = e.target;
	img = document.querySelector(querySelector);
	if(!input.files.length) return;
	file = input.files[0];
	objectURL = URL.createObjectURL(file);
	img.src = objectURL;
}
