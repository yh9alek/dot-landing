import { addupt } from './add.js';
import { eliminarProducto } from './delete.js';
import { agregarPopular } from './add.js';
import { eliminarPopular } from './delete.js';
import { auth } from '../app/firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // El usuario no está autenticado, redirigir a la página de inicio de sesión
    window.location.href = 'login.html';
  }
});

const back = document.querySelector('.header__link');

back.addEventListener('click', e => {
	cerrarSesion();
});

const cerrarSesion = () => {
	// Cerrar sesión
	signOut(auth).then(() => {
		// La sesión ha sido cerrada con éxito
		console.log('Sesión cerrada exitosamente');
		document.location.assign('../../index.html');
	}).catch((error) => {
		// Hubo un error al cerrar sesión
		console.error('Error al cerrar sesión:', error);
	});
}

const btn__add = document.querySelector('.btn__add.pr');
const btn__rem = document.querySelector('.remove .btn__add.pr');
const btn__addp = document.querySelector('.btn__add.po');
const btn__remp = document.querySelector('.remove .btn__add.po');

const codigo = document.querySelector('#cod');
const descripcion = document.querySelector('#desc');
const categoria = document.querySelector('#cat');
const precio = document.querySelector('#precio');
const descuento = document.querySelector('#descuento');
const cantidad = document.querySelector('#stock');
const img = document.querySelector('#file');
const status = document.querySelector('#status');

btn__add.addEventListener('click', async (e) => {
  e.preventDefault();
  await addupt({ codigo: codigo.value, 
                 descripcion: descripcion.value, 
                 categoria: categoria.value, 
                 precio: parseFloat(precio.value), 
                 descuento: descuento.value, 
                 cantidad: cantidad.value, 
                 img: img.files[0], 
                 status: status.checked, });
});

btn__rem.addEventListener('click', async (e) => {
  e.preventDefault();
  await eliminarProducto(document.querySelector('.remove input[type="text"]').value);
});

btn__addp.addEventListener('click', async (e) => {
  e.preventDefault();
  const descripcion = document.querySelector('.populares #desc').value;
  const precio = parseFloat(document.querySelector('.populares #precio').value);
  const rate = document.querySelector('#rate').value;
  const sale = document.querySelector('#sale').checked;
  const img = document.querySelector('.populares #file').files[0];

  await agregarPopular({ descripcion, precio, rate, sale, img });
});

btn__remp.addEventListener('click', async (e) => {
  e.preventDefault();
  await eliminarPopular(document.querySelector('.populares .remove input[type="text"]').value);
});
