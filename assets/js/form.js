import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "../app/firebase.js";

const formulario = document.querySelector('.hero__form');
const em = formulario.querySelector('#email');
const pa = formulario.querySelector('#pass');

const background = document.querySelector('.background');
const message = document.querySelector('.background + .modal h3');
const button = document.querySelector('.background + .modal button');

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    const email = formulario['email'].value;
    const pass = formulario['pass'].value;
    try
    {
        const credentials = await signInWithEmailAndPassword(auth, email, pass);
        console.log(credentials);
        document.location.assign('../html/admin.html');
    } catch (error) {
        if(error.code === 'auth/invalid-login-credentials'){ 
            message.textContent = "Usuario no existente o Contraseña Incorrecta.";
        }
        background.classList.add('active');
    }
});

button.addEventListener('click', (e) => {
    background.classList.remove('active');
    em.value = '';
    pa.value = '';
});