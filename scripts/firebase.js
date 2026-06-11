// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo-xZDr7pDC7WpMmMLCDCL3Q9MA5S0_xg",
  authDomain: "shopease-48720.firebaseapp.com",
  projectId: "shopease-48720",
  storageBucket: "shopease-48720.firebasestorage.app",
  messagingSenderId: "115791746294",
  appId: "1:115791746294:web:ed31a077be4e2e3b1148d7",
  measurementId: "G-SVB3WJE7EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Keep users logged in after refresh
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence enabled");
  })
  .catch((error) => {
    console.log(error);
  });

// Export auth
export { auth };