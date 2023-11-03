import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';
import { db, storage } from '../app/firebase.js';

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

const codigopo = document.querySelector('.populares #cod');
const descripcionpo = document.querySelector('.populares #desc');
const preciopo = document.querySelector('.populares #precio');
const ratepo = document.querySelector('#rate');
const salepo = document.querySelector('#sale');
const imgpo = document.querySelector('.populares #file');
const imagenpo = document.querySelector('.populares .add .admin__figure .product__image');

const codrempo = document.querySelector('#cod_rempo');

export const addupt = async ({codigo, descripcion, categoria, precio, descuento, cantidad, img, status}) => {
  if(!codigo || !descripcion || !precio || !descuento || !cantidad) {
    message.textContent = 'No debe haber campos vacíos';
    background.classList.add('active');
    return;
  }
  try {
    // Colección productos
    const productosCollection = collection(db, 'productos');
    const querySnapshot = await getDocs(query(productosCollection, where('codigo', '==', codigo)));
    if(!img && querySnapshot.empty) {
      message.textContent = 'El producto debe tener una imagen';
      background.classList.add('active');
      return;
    }

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
      message.textContent = 'Se agregó un nuevo producto con éxito.';
    } else {
      // El código existe, actualizar el producto
      const productoDocRef = doc(productosCollection, querySnapshot.docs[0].id);
      await updateDoc(productoDocRef, data);
      message.textContent = 'Se actualizó el producto con éxito.';
    }
  } catch (error) {
    message.textContent = 'Error al agregar o actualizar el producto.';
    background.classList.add('active');
  }
  background.classList.add('active');
};

export const adduptpo = async ({codigo, descripcion, precio, rate, img, sale}) => {
  if(!codigo || !descripcion || !precio || !rate) {
    message.textContent = 'No debe haber campos vacíos';
    background.classList.add('active');
    return;
  }
  try {
    // Colección populares
    const popularesCollection = collection(db, 'populares');
    const querySnapshot = await getDocs(query(popularesCollection, where('codigo', '==', codigo)));
    if(!img && querySnapshot.empty) {
      message.textContent = 'El producto debe tener una imagen';
      background.classList.add('active');
      return;
    }

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
      message.textContent = 'Se agregó un nuevo producto popular con éxito.';
    } else {
      // El código existe, actualizar el producto
      const productoDocRef = doc(popularesCollection, querySnapshot.docs[0].id);
      await updateDoc(productoDocRef, data);
      message.textContent = 'Se actualizó el producto popular con éxito.';
    }
  } catch (error) {
    message.textContent = 'Error al agregar o actualizar el producto popular.';
    background.classList.add('active');
  }
  background.classList.add('active');
};

const limpiar = () => {
  codigo.value = '';
  codigopo.value = '';
  descripcion.value = '';
  descripcionpo.value = '';
  categoria.selectedIndex = 0;
  precio.value = '';
  preciopo.value = '';
  descuento.value = '';
  cantidad.value = '';
  img.value = '';
  imgpo.value = '';
  stat.checked = false;
  imagen.src = '';
  imagenpo.src = '';
  codrempr.value = '';
  codrempo.value = '';
  ratepo.value = '';
  salepo.checked = false;
}

button.addEventListener('click', (e) => {
  background.classList.remove('active');
  limpiar();
});