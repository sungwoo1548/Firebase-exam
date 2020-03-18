import React, { useState } from 'react';

// style
import './App.css'

// firebase
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyB48vgNoCW2K26PlG_BWS4xuu2kWdBBt1U",
  authDomain: "kick-storage-exam.firebaseapp.com",
  databaseURL: "https://kick-storage-exam.firebaseio.com",
  projectId: "kick-storage-exam",
  storageBucket: "kick-storage-exam.appspot.com",
  messagingSenderId: "596019196668",
  appId: "1:596019196668:web:b7cb12fcfa32c2ffcc1d79",
  measurementId: "G-R7XWD1WWZR"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [fileURL, setFileURL] = useState("");

  const fireStorage = firebase.storage();
  const StorageRef = fireStorage.ref();
  const fileRef = StorageRef.child("brian.jpg");

  fileRef.getDownloadURL().then(url => setFileURL(url));

  return (
    <div>
      hello world!
      <img src={fileURL} /> 
    </div>
  )
}

export default App
