import { agregarProducto } from '../js/add.js';

const btn__add = document.querySelector('.btn__add');

btn__add.addEventListener('click', async (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('desc').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const descuento = document.getElementById('descuento').value;
  const cantidad = document.getElementById('stock').value;
  const img = document.getElementById('file').files[0];

  await agregarProducto({ descripcion, precio, descuento, cantidad, img });
});
