// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqTvqhRS1K9wH6TsCU_ADHr2xfsdUHpeA",
  authDomain: "react-magazine-aca11.firebaseapp.com",
  projectId: "react-magazine-aca11",
  storageBucket: "react-magazine-aca11.appspot.com",
  messagingSenderId: "234351135496",
  appId: "1:234351135496:web:c2fd534895fd7c1d723abd",
  measurementId: "G-02B43NCH6S"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = getAuth();
const storage = getStorage();
const realtime = getDatabase();

export const db = getFirestore();
export { auth, apiKey, storage, realtime };