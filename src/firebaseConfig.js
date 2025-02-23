// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhPlMZ0KnT1dSDLsJwF29cLzZzcjubwZc",
  authDomain: "mental-peace-5297d.firebaseapp.com",
  projectId: "mental-peace-5297d",
  storageBucket: "mental-peace-5297d.appspot.com", // Fixed Storage URL
  messagingSenderId: "535605197070",
  appId: "1:535605197070:web:17f5aca03ff7b258f0ff5f",
  measurementId: "G-LCXG6MHMCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
