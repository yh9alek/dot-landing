import { getDocs, collection, query, where } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { db } from '../app/firebase.js';

const background = document.querySelector('.background');
const message = document.querySelector('.background + .modal h3');
const button = document.querySelector('.background + .modal button');

const productos = document.querySelector('.products__container');
const catProductos = document.querySelector('.admin__products-preview select');
const searchProductos = document.querySelector('.admin__products-preview input#search');
const searchPBtn = document.querySelector('.admin__products-preview button.search__btn');

const codigo = document.querySelector('#cod');
const descripcion = document.querySelector('#desc');
const categoria = document.querySelector('#cat');
const precio = document.querySelector('#precio');
const descuento = document.querySelector('#descuento');
const cantidad = document.querySelector('#stock');
const img = document.querySelector('#file');
const status = document.querySelector('#status');
const imagen = document.querySelector('.add .admin__figure .product__image');

catProductos.onchange = () => {
    previewProductos();
}

export const previewProductos = () => {
    getDocs(collection(db, 'productos'))
      .then((querySnapshot) => {
          let html = '';
        querySnapshot.forEach((doc) => {
           let producto = doc.data();
           let item = (producto.status) ? 'item' : 'item inactive';
           // Aquí verifico que la categoria del select sea la misma que la del producto, esto para poder filtrar
           if(catProductos.value !== producto.categoria && catProductos.value !== 'All') return;
           let slide = `<li class="${item}">
           <figure class="item__figure">
               <img src="${producto.url}" alt="Product Image">
           </figure>
           <div class="texts">
               <h4>Cod: <span>${producto.codigo}</span></h4>
               <p>Cat: <span>${producto.categoria}</span></p>
           </div>
           <div class="texts">
               <h4><span>${producto.descripcion}</span></h4>
               <p>$<span>${producto.precio}</span></p>
           </div>
           <div class="texts">
               <h4><span>${producto.descuento}</span>% OFF</h4>
               <p><span>${producto.cantidad}</span> left</p>
           </div>
       </li>`;
          html += slide;
        });
        productos.innerHTML = html;
      })
      .catch((error) => {
        console.error('Error al obtener la información: ', error);
    });
}
previewProductos();

const itemProducto = document.querySelector('productos__container .item');

productos.addEventListener('click', async (e) => {
    e.preventDefault();
    let datos;
    const item = e.target.closest('.item');
    // Colección productos
    const productosCollection = collection(db, 'productos');
    const codigo = item.querySelector('.texts:nth-of-type(1) > h4 span').textContent;
    const querySnapshot = await getDocs(query(productosCollection, where('codigo', '==', codigo)));
    if(item) {
        datos = {
            cod: codigo,
            desc: item.querySelector('.texts:nth-of-type(2) > h4 span').textContent,
            cat: item.querySelector('.texts:nth-of-type(1) > p span').textContent,
            pre: item.querySelector('.texts:nth-of-type(2) > p span').textContent,
            des: item.querySelector('.texts:nth-of-type(3) > h4 span').textContent,
            can: item.querySelector('.texts:nth-of-type(3) > p span').textContent,
            img: item.querySelector('.item__figure img').src,
            stat: (querySnapshot.docs[0].data().status) ? true : false,
        }
    }
    actualizarProducto(datos);
});

export const actualizarProducto = async ({cod, desc, cat, pre, des, can, img, stat}) => {
    codigo.value = cod;
    descripcion.value = desc;
    categoria.value = cat;
    precio.value = pre;
    descuento.value = des;
    cantidad.value = can;
    imagen.src = img;
    status.checked = stat;
}

const buscarProducto = async (cod) => {
    // Colección productos
    const productosCollection = collection(db, 'productos');
    const querySnapshot = await getDocs(query(productosCollection, where('codigo', '==', cod)));
    if(querySnapshot.empty) {
        message.textContent = 'No existe un producto con este código';
        background.classList.add('active');
        return;
    }
    let html = '';
    querySnapshot.docs.forEach(item => {
        let active = (item.data().status) ? 'item' : 'item inactive';
        let slide = `<li class="${active}">
        <figure class="item__figure">
            <img src="${item.data().url}" alt="Product Image">
        </figure>
        <div class="texts">
            <h4>Cod: <span>${item.data().codigo}</span></h4>
            <p>Cat: <span>${item.data().categoria}</span></p>
        </div>
        <div class="texts">
            <h4><span>${item.data().descripcion}</span></h4>
            <p>$<span>${item.data().precio}</span></p>
        </div>
        <div class="texts">
            <h4><span>${item.data().descuento}</span>% OFF</h4>
            <p><span>${item.data().cantidad}</span> left</p>
        </div>
    </li>`;
        html += slide;
    });
    productos.innerHTML = html;
}

searchPBtn.addEventListener('click', (e) => {
    catProductos.selectedIndex = 0;
    buscarProducto(searchProductos.value);
});

searchProductos.oninput = () => {
    if(searchProductos.value === '') {
        catProductos.selectedIndex = 0;
        previewProductos();
    }
}

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