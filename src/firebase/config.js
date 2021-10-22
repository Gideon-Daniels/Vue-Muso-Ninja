import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAeH14pJLsWn8U-whiGtP-_QuN8j3z-OHE",
    authDomain: "muso-ninjas-eaf54.firebaseapp.com",
    projectId: "muso-ninjas-eaf54",
    storageBucket: "muso-ninjas-eaf54.appspot.com",
    messagingSenderId: "34626747002",
    appId: "1:34626747002:web:b11a5bb2670b3e25d519c3"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp, }