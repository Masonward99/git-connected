// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GithubAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPM1Ph08Gecv96dqOEwYsBx5gfF3UNAHQ",
  authDomain: "git-connected-a60dd.firebaseapp.com",
  projectId: "git-connected-a60dd",
  storageBucket: "git-connected-a60dd.appspot.com",
  messagingSenderId: "334351720471",
  appId: "1:334351720471:web:f0248260aff2f2eace7c52",
  measurementId: "G-K2CMZ55TR6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GithubAuthProvider(app);
export const db = getFirestore(app)
