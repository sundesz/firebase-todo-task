import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCAyNGaeqEphRPDZ7tMREYlUphbdcHUMIY",
  authDomain: "fir-todo-4cf12.firebaseapp.com",
  projectId: "fir-todo-4cf12",
  storageBucket: "fir-todo-4cf12.appspot.com",
  messagingSenderId: "897100334571",
  appId: "1:897100334571:web:76927c8582f0553c9085ae",
  measurementId: "G-EVVNTH10EB"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }