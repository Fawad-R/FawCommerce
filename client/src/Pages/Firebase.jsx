import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDnfHMmDwqcxhNJwE_PpcZZHYM-dIuRdKE",
  authDomain: "faw-ecommerce.firebaseapp.com",
  projectId: "faw-ecommerce",
  storageBucket: "faw-ecommerce.appspot.com",
  messagingSenderId: "935333262416",
  appId: "1:935333262416:web:5bbeaab8f55f3f7a594d55",
  measurementId: "G-WHJZ33XV56"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);