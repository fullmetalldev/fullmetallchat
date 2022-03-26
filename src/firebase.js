import firebase from "firebase/compat/app";

import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBDp5WXKXMZ6Qs39Ult_Tae2jmRakdE_aw",
    authDomain: "sadyrgram.firebaseapp.com",
    databaseURL: "https://sadyrgram-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sadyrgram",
    storageBucket: "sadyrgram.appspot.com",
    messagingSenderId: "1020073453942",
    appId: "1:1020073453942:web:7d803f1f467963a7b83257",
    measurementId: "G-F2WBVJ6J3D"
};

firebase.initializeApp(firebaseConfig);

export const db = getDatabase();




