
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAVUqA8600kbTSS_wEmWRa0ouFZUao4Ea4",
    authDomain: "chat-app-d95c0.firebaseapp.com",
    projectId: "chat-app-d95c0",
    storageBucket: "chat-app-d95c0.firebasestorage.app",
    messagingSenderId: "1031594231809",
    appId: "1:1031594231809:web:0d2b9df2455d1518c71800",
    measurementId: "G-HK2QVZCPVK"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();
  const db = firebase.firestore();
  auth.useEmulator('http://localhost:9099');
  if(window.location.hostname==='localhost') {
    db.useEmulator('localhost',8080);
    
  }
  export { auth, db };
export default firebase;