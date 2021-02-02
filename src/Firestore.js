import firebase from "firebase";

const db = firebase.initializeApp({
    projectId: "whatsapp-clone-1d546",
    databaseUrl: "https://whatsapp-clone-1d546.firebaseio.com"
}).firestore();

export default db;