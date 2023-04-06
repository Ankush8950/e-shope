import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDLKgDWumxqFv3NDAZk3z1782oSFZmZuNA",
    authDomain: "eshop-8ee53.firebaseapp.com",
    projectId: "eshop-8ee53",
    storageBucket: "eshop-8ee53.appspot.com",
    messagingSenderId: "398331726652",
    appId: "1:398331726652:web:1eddbda740a9eaef25ec39"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
