import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgwvac0a6edc1lidY3PoKVZqhlZhAfDUM",
  authDomain: "social-media-ded75.firebaseapp.com",
  projectId: "social-media-ded75",
  storageBucket: "social-media-ded75.appspot.com",
  messagingSenderId: "108139428750",
  appId: "1:108139428750:web:9dc520dcd42cf3290cc2df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore();
export const storage = getStorage(app);