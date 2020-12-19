// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCj8ej1V7aI7IyRvxu4P30fJHM9hxjI9j4",
    authDomain: "imessage-clone-5c142.firebaseapp.com",
    projectId: "imessage-clone-5c142",
    storageBucket: "imessage-clone-5c142.appspot.com",
    messagingSenderId: "559116935763",
    appId: "1:559116935763:web:543ec193c599311032dca6",
    measurementId: "G-DLE7MN9YNR"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  export {auth, provider};
  export default db;