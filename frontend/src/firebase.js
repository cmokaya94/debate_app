// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpSnEMkm4VKpHTIJZfm2YiaawFp4VEQNg",
    authDomain: "cote-c0321.firebaseapp.com",
    projectId: "cote-c0321",
    storageBucket: "cote-c0321.firebasestorage.app",
    messagingSenderId: "594558655156",
    appId: "1:594558655156:web:d272ac414a703ff21895e1",
    measurementId: "G-8851GQ816G"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };