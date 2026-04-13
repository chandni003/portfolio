import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2gaLVZzabJLSrby61rDa3pFHMhyrTslo",
  authDomain: "portfolio1-6028f.firebaseapp.com",
  projectId: "portfolio1-6028f",
  storageBucket: "portfolio1-6028f.firebasestorage.app",
  messagingSenderId: "237926805881",
  appId: "1:237926805881:web:7b5554311b69e239ccbfa8"
};

// Initialize Firebase (Singleton pattern for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };