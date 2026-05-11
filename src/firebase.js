import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4PCnt0qul50qkSomVuB9D0ImCpJw_q1k",
  authDomain: "movie-app-d7980.firebaseapp.com",
  projectId: "movie-app-d7980",
  storageBucket: "movie-app-d7980.firebasestorage.app",
  messagingSenderId: "189321716843",
  appId: "1:189321716843:web:5ffa0a44d0117ca918fd2e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
