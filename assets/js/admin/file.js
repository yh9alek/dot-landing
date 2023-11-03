function mostrar(e, querySelector){
	const input = e.target;
	let img = document.querySelector(querySelector);
	if(!input.files.length) return;
	let file = input.files[0];
	let objectURL = src = URL.createObjectURL(file);
	img.src = objectURL;
}

function mostrarp(e, querySelector){
	const input = e.target;
	let img = document.querySelector(querySelector);
	if(!input.files.length) return;
	let file = input.files[0];
	let objectURL = src = URL.createObjectURL(file);
	img.src = objectURL;
}