import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJ5MbrVa2LWeqkvFeNnKZekLg6UQku6H0",
  authDomain: "shemeta-b24be.firebaseapp.com",
  projectId: "shemeta-b24be",
  storageBucket: "shemeta-b24be.appspot.com",
  messagingSenderId: "712266756339",
  appId: "1:712266756339:web:5540d9fae4ed323fe30786",
  measurementId: "G-XCTJ78TSYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;