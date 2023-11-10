import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7gzxP2xoK4TRUJe1tpGbfP98JhJCzGSY",
  authDomain: "center-id.firebaseapp.com",
  projectId: "center-id",
  storageBucket: "center-id.appspot.com",
  messagingSenderId: "1099496724881",
  appId: "1:1099496724881:web:fe4785ae69bb98b2f12230"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


