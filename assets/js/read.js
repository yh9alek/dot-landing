import { getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

import { db } from '../app/firebase.js';

let productos = document.querySelector('.products-swiper .swiper-wrapper');

const leerProductos = () => {
  getDocs(collection(db, 'productos'))
    .then((querySnapshot) => {
        let html = '';
      querySnapshot.forEach((doc) => {
         let producto = doc.data();
         let slide = `<div class="swiper-slide">
         <div class="slide__content">
             <figure class="slide__figure">
                 <img src="${producto.url}" alt="Product Image">
             </figure>
             <h3>${producto.descripcion}</h3>
             <div class="price">
                 <p><span>$</span>${producto.precio}<span></span></p>
                 <p>${producto.descuento}% OFF</p>
             </div>
             <div class="buy">
                 <a href="#" class="btn-buy">Buy now</a>
                 <i class="fa-solid fa-heart"></i>
             </div>
         </div>
         <div class="bar"></div>
         <div class="tags">
             <p>50% Lorem</p>
             <p><span>${producto.cantidad}</span> Left</p>
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
