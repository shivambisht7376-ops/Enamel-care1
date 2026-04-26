import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYB-VCf3wf8IM_BI2XhV6H93z4CMLHkS0",
  authDomain: "enamel-dental-865fc.firebaseapp.com",
  projectId: "enamel-dental-865fc",
  storageBucket: "enamel-dental-865fc.firebasestorage.app",
  messagingSenderId: "513789423626",
  appId: "1:513789423626:web:4702aa5e5a5399fdb1aff3",
  measurementId: "G-PQN5XMXJ93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
