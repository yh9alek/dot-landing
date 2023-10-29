import { doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

import { db } from '../app/firebase.js';

const idDocumentoEliminar = 'Bg07lNFYywRmyT5yxwXG';

// Función para eliminar información en Firestore
export const eliminarInformacion = async (id) => {
  try {
    // Documento en la colección 'productos'
    const productoDoc = doc(db, 'productos', id);

    // Elimina el documento
    await deleteDoc(productoDoc);

    console.log('Documento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
  }
};