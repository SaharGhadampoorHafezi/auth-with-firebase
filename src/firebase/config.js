import { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyDNBUVSLzR2AkRtCPtWv73kGKHBSOR6Zfs",
  authDomain: "eshop-a5125.firebaseapp.com",
  projectId: "eshop-a5125",
  storageBucket: "eshop-a5125.appspot.com",
  messagingSenderId: "688053863095",
  appId: "1:688053863095:web:b8e0eab47e46c564fd4332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;