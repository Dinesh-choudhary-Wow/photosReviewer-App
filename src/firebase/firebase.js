import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "photosreview-58b91.firebaseapp.com",
  projectId: "photosreview-58b91",
  storageBucket: "photosreview-58b91.appspot.com",
  messagingSenderId: "935782007861",
  appId: "1:935782007861:web:4cce718367f00dd0711d7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const photosRef = collection(db,"photos");
 export const reviewsRef = collection(db,"reviews");
 export const usersRef = collection(db,"users");

export default app;