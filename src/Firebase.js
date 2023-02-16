// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9zP8cke7LcJIIW6XWb0jitgVXU83vNxo",
  authDomain: "instant-message-652ee.firebaseapp.com",
  projectId: "instant-message-652ee",
  storageBucket: "instant-message-652ee.appspot.com",
  messagingSenderId: "832940980400",
  appId: "1:832940980400:web:0b9efb5d009cdaeb73a375"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()