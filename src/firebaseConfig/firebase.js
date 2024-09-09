import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuBwgnQpIwPWZfTst6WrMzEVtSyf4ge8U",
  authDomain: "crud-fire-react-26519.firebaseapp.com",
  projectId: "crud-fire-react-26519",
  storageBucket: "crud-fire-react-26519.appspot.com",
  messagingSenderId: "899702120808",
  appId: "1:899702120808:web:ee01e51cd9bc566289f6dd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);