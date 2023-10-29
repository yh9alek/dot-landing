// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg4UVruA1ckttbTXo8fAhHSmqX5a4xWIo",
  authDomain: "dot-landing.firebaseapp.com",
  projectId: "dot-landing",
  storageBucket: "dot-landing.appspot.com",
  messagingSenderId: "817677930509",
  appId: "1:817677930509:web:5a561aeb560d94cca68544"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);