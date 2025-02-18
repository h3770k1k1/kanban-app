import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  {API_KEY} from "./key.js"

const FirebaseConfig = {
    apiKey: API_KEY,
    authDomain: "kanban-app-7e180.firebaseapp.com",
    projectId: "kanban-app-7e180",
    storageBucket: "kanban-app-7e180.firebasestorage.app",
    messagingSenderId: "47731922674",
    appId: "1:47731922674:web:6017fb7158783cab85626b",
    measurementId: "G-WKGLYN00VP"
};

const app = initializeApp(FirebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, firestore,db };
