import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';
import { db, storage } from '../app/firebase.js';

export const addupt = async ({codigo, descripcion, categoria, precio, descuento, cantidad, img, status}) => {
  try {
    // Colección productos
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

export const adduptpo = async ({codigo, descripcion, precio, rate, img, sale}) => {
  try {
    // Colección populares
    const popularesCollection = collection(db, 'populares');
    const querySnapshot = await getDocs(query(popularesCollection, where('codigo', '==', codigo)));

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
      precio: precio,
      rate: rate,
      url: imageUrl,
      sale: sale,
    };

    // Agrega los datos a la colección
    if (querySnapshot.empty) {
      // El código no existe, agregar un nuevo producto
      await addDoc(popularesCollection, data);
    } else {
      // El código existe, actualizar el producto
      const productoDocRef = doc(popularesCollection, querySnapshot.docs[0].id);
      await updateDoc(productoDocRef, data);
    }
  } catch (error) {
    console.error('Error al agregar o actualizar el documento:', error);
  }
};