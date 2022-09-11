
import {initializeApp} from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig={
    apiKey: "AIzaSyCKrLMjInNxIJup8ZwSSTt9Bp7x1ovmvuw",
    authDomain: "studyapp-a7387.firebaseapp.com",
    projectId: "studyapp-a7387",
    storageBucket: "studyapp-a7387.appspot.com",
    messagingSenderId: "759071558550",
    appId: "1:759071558550:web:9a16d6d5286e4cfe7fabb7",
    measurementId: "G-3KSH6NH7YG"
}


firebase.initializeApp(firebaseConfig)

export const db = getFirestore()

export { firebase }





    
