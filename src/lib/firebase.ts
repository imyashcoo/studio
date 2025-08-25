
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "rackup-mvp",
  appId: "1:175234092883:web:8978ed10dad9f560a41ba6",
  storageBucket: "rackup-mvp.firebasestorage.app",
  apiKey: "AIzaSyB-64ksgP82A3Y-mQpcvTrET2zW2XCpOmU",
  authDomain: "rackup-mvp.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "175234092883",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
