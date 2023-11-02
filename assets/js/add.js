import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';
import { db, storage } from '../app/firebase.js';

// Función para agregar información y subir imagen a Firestore
export const addupt = async ({codigo, descripcion, categoria, precio, descuento, cantidad, img, status}) => {
  try {
    // Colección 'productos'
    const productosCollection = collection(db, 'productos');
    const querySnapshot = await getDocs(query(productosCollection, where('codigo', '==', codigo)));

    // Obtener la URL de la imagen, ya sea nueva o existente
    let imageUrl = null;
    if (img) {
      const storageRef = ref(storage, 'imagenes/' + img.name);
      await uploadBytes(storageRef, img);
      imageUrl = await getDownloadURL(storageRef);
    } else if (!img && !querySnapshot.empty) {
      imageUrl = querySnapshot.docs[0].data().url;
    }

    const data = {
      codigo: codigo,
      descripcion: descripcion,
      categoria: categoria,
      precio: precio,
      descuento: descuento,
      cantidad: cantidad,
      url: imageUrl,
      status: status,
    };

    // Agrega los datos a la colección
    if (querySnapshot.empty) {
      // El código no existe, agregar un nuevo producto
      await addDoc(productosCollection, data);
    } else {
      // El código existe, actualizar el producto
      const productoDocRef = doc(productosCollection, querySnapshot.docs[0].id);
      await updateDoc(productoDocRef, data);
    }
  } catch (error) {
    console.error('Error al agregar o actualizar el documento:', error);
  }
};

export const agregarPopular = async ({descripcion, precio, rate, sale, img}) => {
  try {
    // Subir la imagen a Firebase Storage
    const storageRef = ref(storage, 'imagenes/' + img.name);
    await uploadBytes(storageRef, img);

    // Obtener la URL de la imagen recién subida
    const imageUrl = await getDownloadURL(storageRef);

    // Colección 'productos'
    const productosCollection = collection(db, 'populares');

    const data = {
      descripcion: descripcion,
      precio: precio,
      rate: rate,
      sale: sale,
      url: imageUrl,
    };

    // Agrega los datos a la colección
    const docRef = await addDoc(productosCollection, data);

    console.log('Documento agregado con ID:', docRef.id);
  } catch (error) {
    console.error('Error al agregar el documento:', error);
  }
};