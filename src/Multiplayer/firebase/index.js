
import firebase from 'firebase/app'; 
import firestore from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBNIoYeyX1IfjD9nFGMoFLH9pNyJJli3Gc",
    authDomain: "reverse-tic-tac-toe.firebaseapp.com",
    projectId: "reverse-tic-tac-toe",
    storageBucket: "reverse-tic-tac-toe.appspot.com",
    messagingSenderId: "484297687514",
    appId: "1:484297687514:web:8eef34f849588cb48380e3"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db