// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6c2rANWbvalKxySrgsPlx_3TozOE1OsE",
  authDomain: "photofolionew.firebaseapp.com",
  projectId: "photofolionew",
  storageBucket: "photofolionew.appspot.com",
  messagingSenderId: "331938178485",
  appId: "1:331938178485:web:4c39fd3d13b9b05a53e5fc",
  measurementId: "G-QE3DXV4RFN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
