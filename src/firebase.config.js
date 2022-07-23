import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8pfr-0ZZdZkqJ0JJNxtFbxBYeShOCNps",
  authDomain: "diyorshop-ffcd9.firebaseapp.com",
  projectId: "diyorshop-ffcd9",
  storageBucket: "diyorshop-ffcd9.appspot.com",
  messagingSenderId: "231247150376",
  appId: "1:231247150376:web:08263ee2899cc0be92a41d",
  measurementId: "G-B48W5JHVD9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };

export function useAuth() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => setCurrentUser(user));
    return unsub
  }, []);
  return currentUser;
}


