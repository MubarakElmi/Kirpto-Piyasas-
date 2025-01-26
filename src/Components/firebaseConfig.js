import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcvvYG07YPyU5KPNGbNnKW16655nl8JQg",
    authDomain: "kirpto-b272b.firebaseapp.com",
    projectId: "kirpto-b272b",
    storageBucket: "kirpto-b272b.firebasestorage.app",
    messagingSenderId: "941227900864",
    appId: "1:941227900864:web:4be0542f81ef085cf39225",
    measurementId: "G-LSC4T6N48P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);