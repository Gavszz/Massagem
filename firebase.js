// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTrWQjEfoUXq4_Tb1FPY002iec26nQUO4",
  authDomain: "metamorfose-2f3a7.firebaseapp.com",
  projectId: "metamorfose-2f3a7",
  storageBucket: "metamorfose-2f3a7.firebasestorage.app",
  messagingSenderId: "1041423812821",
  appId: "1:1041423812821:web:479dd3afa705aad2fffa5c",
  measurementId: "G-KZW6V8RKEB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
