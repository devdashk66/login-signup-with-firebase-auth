// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAus_mQofH-peHbohRKHyu1zujLAwE5syo",
  authDomain: "learn-firebase-again.firebaseapp.com",
  projectId: "learn-firebase-again",
  storageBucket: "learn-firebase-again.appspot.com",
  messagingSenderId: "904929762229",
  appId: "1:904929762229:web:b4bb15250756c312f817fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
