import { agregarProducto } from '../js/add.js';
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

const btn__add = document.querySelector('.btn__add');

btn__add.addEventListener('click', async (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('desc').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const descuento = document.getElementById('descuento').value;
  const cantidad = document.getElementById('stock').value;
  const img = document.getElementById('file').files[0];

  await agregarProducto({ descripcion, precio, descuento, cantidad, img });
});
