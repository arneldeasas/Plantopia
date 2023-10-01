
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAyRH56_fCyWWcZWlxgkO8mq2YjphjXJsM",
  authDomain: "plantopia-9ec40.firebaseapp.com",
  projectId: "plantopia-9ec40",
  storageBucket: "plantopia-9ec40.appspot.com",
  messagingSenderId: "416916165230",
  appId: "1:416916165230:web:9839b0c08792d67e384c7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);