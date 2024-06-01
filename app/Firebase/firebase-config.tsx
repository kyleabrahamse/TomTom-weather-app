import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNThwkLRCVEKx6FhLzto8_yeEsohC_mlE",
  authDomain: "weather-app-72e6d.firebaseapp.com",
  projectId: "weather-app-72e6d",
  storageBucket: "weather-app-72e6d.appspot.com",
  messagingSenderId: "695692021097",
  appId: "1:695692021097:web:c2bee05197fad6323781f8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()

export default db