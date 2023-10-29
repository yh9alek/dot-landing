import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';
import { db, storage } from '../app/firebase.js';

// Función para agregar información y subir imagen a Firestore
export const agregarProducto = async ({descripcion, precio, descuento, cantidad, img}) => {
  try {
    // Subir la imagen a Firebase Storage
    const storageRef = ref(storage, 'imagenes/' + img.name);
    await uploadBytes(storageRef, img);

    // Obtener la URL de la imagen recién subida
    const imageUrl = await getDownloadURL(storageRef);

    // Colección 'productos'
    const productosCollection = collection(db, 'productos');

    const data = {
      descripcion: descripcion,
      precio: precio,
      descuento: descuento,
      cantidad: cantidad,
      url: imageUrl,
    };

    // Agrega los datos a la colección
    const docRef = await addDoc(productosCollection, data);

    console.log('Documento agregado con ID:', docRef.id);
  } catch (error) {
    console.error('Error al agregar el documento:', error);
  }
};