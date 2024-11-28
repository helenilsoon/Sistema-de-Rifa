// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7DGma_Q8c_9N8qcc4Q8uZPsQiUR1rXBQ",
  authDomain: "rifa-3fd45.firebaseapp.com",
  projectId: "rifa-3fd45",
  storageBucket: "rifa-3fd45.appspot.com",
  messagingSenderId: "1036686240113",
  appId: "1:1036686240113:web:38bf7f4c1377ed1f49eed0",
  measurementId: "G-4XXMES8PG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools