// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2N7PSiZTsy-1SNk9QzBS_j_nmGh8FKd4",
  authDomain: "list-note-app.firebaseapp.com",
  projectId: "list-note-app",
  storageBucket: "list-note-app.firebasestorage.app",
  messagingSenderId: "468758247384",
  appId: "1:468758247384:web:8e27da3ea1d9f6da4024ad",
  measurementId: "G-C3G8G1QWJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export default database;