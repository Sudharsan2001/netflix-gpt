// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy96HSS986j45iZNz5v4vUaVNK05Bhfh0",
  authDomain: "netflixgpt-4f7dc.firebaseapp.com",
  projectId: "netflixgpt-4f7dc",
  storageBucket: "netflixgpt-4f7dc.appspot.com",
  messagingSenderId: "436233225128",
  appId: "1:436233225128:web:1bddafc09c26eec05c939d",
  measurementId: "G-RYHP4MQGWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();