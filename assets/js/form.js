import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "../app/firebase.js";

const warning = document.querySelector('.warning');
const formulario = document.querySelector('.hero__form');

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
        if(error.code === 'auth/wrong-password'){ 
            warning.textContent = "Wrong Password";
        }else if(error.code === 'auth/user-not-found') {
            warning.textContent = "User not Found";
        }
    }
});