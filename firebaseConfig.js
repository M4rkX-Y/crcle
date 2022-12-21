import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDWn2OHTeYKRcqPPwiu9ZXMBLuHjhTOwSM",
    authDomain: "idea-connect.firebaseapp.com",
    projectId: "idea-connect",
    storageBucket: "idea-connect.appspot.com",
    messagingSenderId: "585466817857",
    appId: "1:585466817857:web:87e9d6e621bc82542505c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {
  auth,
  db
}
