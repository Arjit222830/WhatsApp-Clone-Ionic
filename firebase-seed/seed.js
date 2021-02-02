const firebase = require("firebase");
require("firebase/firestore");

const users = require("./data");

firebase.initializeApp({
  apiKey: "AIzaSyDLQBeCclP4hZRaqSGKWPmwTlO-NGt1kZg",
  authDomain: "whatsapp-clone-1d546.firebaseapp.com",
  projectId: "whatsapp-clone-1d546",
  storageBucket: "whatsapp-clone-1d546.appspot.com",
  messagingSenderId: "699002795829",
  appId: "1:699002795829:web:e22a2c6f6520c63b28be7c",
  measurementId: "G-1CTY1ZHYVG"
});

const db = firebase.firestore();

users.forEach((user) => {
  db.collection("users")
    .add(user)
    .then((docRef) => {
      console.log(`Document written with ID : ${docRef.id}`);
    })
    .catch((error) => {
      console.error(`Error writing document : ${error}`);
    });
});