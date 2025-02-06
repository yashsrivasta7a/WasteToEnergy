import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBQlnl8_vNaoEXfoLvP2IgYOvgcXu5MF-Q",
    authDomain: "waste2energy-d292d.firebaseapp.com",
    databaseURL: "https://waste2energy-d292d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "waste2energy-d292d",
    storageBucket: "waste2energy-d292d.firebasestorage.app",
    messagingSenderId: "592086429328",
    appId: "1:592086429328:web:1a6895b8f368532cbf7215",
    measurementId: "G-5WVK1BY2X7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, get, onValue };
