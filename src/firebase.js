
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKD0rB-4V2sZ_K1VFdQr8JtFnhuueqKb8",
  authDomain: "zshop-559fa.firebaseapp.com",
  projectId: "zshop-559fa",
  storageBucket: "zshop-559fa.appspot.com",
  messagingSenderId: "796555296770",
  appId: "1:796555296770:web:a7a525b6f8a452c7ca671b"
};

// Initialize Firebase
const app= initializeApp(firebaseConfig);

// Optional: Initialize other Firebase services
const auth = getAuth(app);

// Export the necessary instances or services
export { app, auth };