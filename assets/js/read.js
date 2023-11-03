import { getDocs, collection, query, where } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { db } from '../app/firebase.js';

let productos = document.querySelector('.products-swiper .swiper-wrapper');
let populares = document.querySelector('.populars-swiper .swiper-wrapper');
const categoria = document.querySelector('select');
const search = document.querySelector('.btn-search');
const input_search = document.querySelector('.home__inputs input');

const background = document.querySelector('.background');
const message = document.querySelector('.background + .modal h3');
const button = document.querySelector('.background + .modal button');

// Cada vez que cambio el select, se actualizan los productos normales
categoria.onchange = () => {
    leerProductos();
}

const leerProductos = () => {
  getDocs(collection(db, 'productos'))
    .then((querySnapshot) => {
        let html = '';
      querySnapshot.forEach((doc) => {
         let producto = doc.data();
         // Aquí verifico que la categoria del select sea la misma que la del producto, esto para poder filtrar
         if(categoria.value !== producto.categoria && categoria.value !== 'All') return;
         // Verifico que el status sea activo para poder mostrar
         if(!producto.status) return;
         let slide = `<div class="swiper-slide">
         <div class="slide__content">
             <figure class="slide__figure">
                 <img src="${producto.url}" alt="Product Image">
             </figure>
             <h3>${producto.descripcion}</h3>
             <div class="price">
                 <p><span>$</span>${producto.precio}</p>
                 <p>${producto.descuento}% OFF</p>
             </div>
             <div class="buy">
                 <a href="#" class="btn-buy">Buy now</a>
                 <i class="fa-solid fa-heart"></i>
             </div>
             <div class="bar"></div>
             <div class="tags">
                 <p>50% Lorem</p>
                 <p><span>${producto.cantidad}</span> Left</p>
             </div>
         </div>
     </div>`;
        html += slide;
      });
      productos.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error al obtener la información: ', error);
    });
};

leerProductos();

const leerPopulares = () => {
  getDocs(collection(db, 'populares'))
    .then((querySnapshot) => {
        let html = '';
        let sale = '';
        let stars = '';
      querySnapshot.forEach((doc) => {
         let producto = doc.data();
         sale = (producto.sale) ? 'SALE' : 'OFF';
         for(let i = 0; i < producto.rate; i++) {
            stars += '<i class="fa-solid fa-star"></i>';
         }
         for (let i = 0; i < 5 - producto.rate; i++) {
            stars += '<i class="fa-regular fa-star"></i>';
         }
         let slide = `<div class="swiper-slide">
         <div class="slide__content">
             <div class="b"></div>
             <a href="#" class="slide-heart"><i class="fa-solid fa-heart"></i></a>
             <a href="#" class="slide-view"><i class="fa-solid fa-eye"></i></a>
             <a href="#" class="slide-cart"><i class="fa-solid fa-cart-shopping"></i></a>
             <p class="slide__sale">${sale}</p>
             <figure class="slide__figure">
                 <img src="${producto.url}" alt="Product Image">
             </figure>
             <h3>${producto.descripcion}</h3>
             <div class="price">
                 <p><span>$</span>${producto.precio}</p>
                 <div class="stars">
                     ${stars}
                 </div>
             </div>
         </div>
     </div>`;
        html += slide;
        stars = '';
      });
      populares.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error al obtener la información: ', error);
    });
};
leerPopulares();

const buscarProducto = async (descripcion) => {
  // Colección productos
  const productosCollection = collection(db, 'productos');
  const querySnapshot = await getDocs(query(productosCollection, where('descripcion', '==', descripcion)));
  if(querySnapshot.empty) {
      message.textContent = 'No existe este producto';
      background.classList.add('active');
      return;
  }
  let html = '';
  querySnapshot.docs.forEach(item => {
      let active = (item.data().status) ? 'item' : 'item inactive';
      let slide = `<div class="swiper-slide">
      <div class="slide__content">
          <figure class="slide__figure">
              <img src="${item.data().url}" alt="Product Image">
          </figure>
          <h3>${item.data().descripcion}</h3>
          <div class="price">
              <p><span>$</span>${item.data().precio}</p>
              <p>${item.data().descuento}% OFF</p>
          </div>
          <div class="buy">
              <a href="#" class="btn-buy">Buy now</a>
              <i class="fa-solid fa-heart"></i>
          </div>
          <div class="bar"></div>
          <div class="tags">
              <p>50% Lorem</p>
              <p><span>${item.data().cantidad}</span> Left</p>
          </div>
      </div>
  </div>`;
      html += slide;
  });
  productos.innerHTML = html;
}

search.addEventListener('click', (e) => {
  e.preventDefault();
  categoria.selectedIndex = 0;
  buscarProducto(input_search.value);
});

button.addEventListener('click', (e) => {
    background.classList.remove('active');
    input_search.value = '';
});

input_search.oninput = () =>{
    if(input_search.value === '') {
        categoria.selectedIndex = 0;
        leerProductos();
    }
}