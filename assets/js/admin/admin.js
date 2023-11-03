import { addupt } from './add.js';
import { adduptpo } from './add.js';
import { eliminar } from './delete.js';
import { previewPopulares, previewProductos } from './previews.js';
import { auth } from '../../app/firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

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

const codrempr = document.querySelector('#cod_rempr');

const codigopo = document.querySelector('.populares #cod');
const descripcionpo = document.querySelector('.populares #desc');
const preciopo = document.querySelector('.populares #precio');
const ratepo = document.querySelector('#rate');
const salepo = document.querySelector('#sale');
const imgpo = document.querySelector('.populares #file');

const codrempo = document.querySelector('#cod_rempo');

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
  previewProductos();
});

btn__rem.addEventListener('click', async (e) => {
  e.preventDefault();
  await eliminar(codrempr.value, 'productos');
});

btn__addp.addEventListener('click', async (e) => {
  e.preventDefault();
  await adduptpo({ codigo: codigopo.value,
                   descripcion: descripcionpo.value, 
                   precio: parseFloat(preciopo.value),
                   rate: ratepo.value,
                   img: imgpo.files[0], 
                   sale: salepo.checked, });
  previewPopulares();
});

btn__remp.addEventListener('click', async (e) => {
  e.preventDefault();
  await eliminar(codrempo.value, 'populares');
});
