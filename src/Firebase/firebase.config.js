// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxMQXAVJQoKHJn2RJbyMZ4VLcdqeN_NGw",
  authDomain: "rent-apartment-e397a.firebaseapp.com",
  projectId: "rent-apartment-e397a",
  storageBucket: "rent-apartment-e397a.firebasestorage.app",
  messagingSenderId: "747367573230",
  appId: "1:747367573230:web:ba0f9b39a5fe02acb0b5ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
