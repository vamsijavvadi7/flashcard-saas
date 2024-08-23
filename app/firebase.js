

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKkHr1fiK2wRZYyuLoU1T6-1xvTcfQwmc",
  authDomain: "flashcards-7b789.firebaseapp.com",
  projectId: "flashcards-7b789",
  storageBucket: "flashcards-7b789.appspot.com",
  messagingSenderId: "293946268122",
  appId: "1:293946268122:web:cc128e395860633a8b48e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;