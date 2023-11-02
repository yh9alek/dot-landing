import { doc, deleteDoc, query, where, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

import { db } from '../app/firebase.js';

export const eliminarProducto = async (codigo) => {
  try {
    // Buscar el documento con el código proporcionado
    const q = query(collection(db, 'productos'), where('codigo', '==', codigo));
    const querySnapshot = await getDocs(q);

    // Verificar si se encontró algún documento con el código
    if (querySnapshot.size === 0) {
      console.error('No se encontró ningún producto con el código proporcionado');
      return;
    }

    // Eliminar el primer documento encontrado (asumiendo que los códigos son únicos)
    const productoDoc = querySnapshot.docs[0].ref;
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