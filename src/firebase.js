
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";



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
const db = getFirestore(app);
const storage = getStorage();

// Fetch documents from Firestore
async function fetchDocs() {
  const colRef = collection(db, 'products');
  const docsSnap = await getDocs(colRef);
  return docsSnap;
}

// Export the necessary instances or services
export { app, auth, db, storage, fetchDocs };