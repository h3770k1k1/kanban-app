import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FirebaseConfig = {
    apiKey: "AIzaSyDbBdTnPEXWM4injy8rRntExdCwqu55u0s",
    authDomain: "kanban-app-7e180.firebaseapp.com",
    projectId: "kanban-app-7e180",
    storageBucket: "kanban-app-7e180.firebasestorage.app",
    messagingSenderId: "47731922674",
    appId: "1:47731922674:web:6017fb7158783cab85626b",
    measurementId: "G-WKGLYN00VP"
};

const app = initializeApp(FirebaseConfig);

const auth = getAuth(app);

export { app, auth };
