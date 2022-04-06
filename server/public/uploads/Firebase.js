import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyBHaL-sUARi6a4klDiajuy9s9mZoIqe1dA",
    authDomain: "login-ad8a3.firebaseapp.com",
    projectId: "login-ad8a3",
    storageBucket: "login-ad8a3.appspot.com",
    messagingSenderId: "801432168115",
    appId: "1:801432168115:web:f0aa0ba174d946361cf2c6"
  };
const myauth = firebase.initializeApp(firebaseConfig);
export const auth =myauth.auth();
export const db=firebase.firestore();
export const storage=firebase.storage();