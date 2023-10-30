import { doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

import { db } from '../app/firebase.js';

// Función para eliminar información en Firestore
export const eliminarProducto = async (id) => {
  try {
    const productoDoc = doc(db, 'productos', id);

    await deleteDoc(productoDoc);

    console.log('Documento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
  }
};

export const eliminarPopular = async (id) => {
  try {
    const productoDoc = doc(db, 'populares', id);

    await deleteDoc(productoDoc);

    console.log('Documento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
  }
};