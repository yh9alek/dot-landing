import { doc, deleteDoc, query, where, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { previewProductos } from './previews.js';

import { db } from '../app/firebase.js';

const background = document.querySelector('.background');
const message = document.querySelector('.background + .modal h3');
const button = document.querySelector('.background + .modal button');

const codigo = document.querySelector('#cod');
const descripcion = document.querySelector('#desc');
const categoria = document.querySelector('#cat');
const precio = document.querySelector('#precio');
const descuento = document.querySelector('#descuento');
const cantidad = document.querySelector('#stock');
const img = document.querySelector('#file');
const stat = document.querySelector('#status');
const imagen = document.querySelector('.add .admin__figure .product__image');
const codrempr = document.querySelector('#cod_rempr');

export const eliminar = async (cod, coleccion) => {
  if (!cod) {
    message.textContent = 'Debes proporcionar un código para eliminar.';
    background.classList.add('active');
    return;
  }
  try {
    // Buscar el documento con el código proporcionado
    const q = query(collection(db, coleccion), where('codigo', '==', cod));
    const querySnapshot = await getDocs(q);

    // Verificar si se encontró algún documento con el código
    if (querySnapshot.size === 0) {
      message.textContent = 'No se encontró ningún producto con el código proporcionado.';
      background.classList.add('active');
      return;
    }

    // Eliminar el primer documento encontrado (asumiendo que los códigos son únicos)
    const productoDoc = querySnapshot.docs[0].ref;
    await deleteDoc(productoDoc);
    previewProductos();
    message.textContent = 'Producto eliminado correctamente.';
  } catch (error) {
    message.textContent = 'Error al eliminar el producto.';
  }
  background.classList.add('active');
};

const limpiar = () => {
  codigo.value = '';
  descripcion.value = '';
  categoria.selectedIndex = 0;
  precio.value = '';
  descuento.value = '';
  cantidad.value = '';
  img.value = '';
  stat.checked = false;
  imagen.src = '';
  codrempr.value = '';
}

button.addEventListener('click', (e) => {
  background.classList.remove('active');
  limpiar();
});