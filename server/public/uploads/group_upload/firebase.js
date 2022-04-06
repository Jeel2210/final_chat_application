import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyBVYdLTqNkaw-EbMSynvI_57YTtfTFEwj0",
    authDomain: "todo-8fe8e.firebaseapp.com",
    databaseURL: "https://todo-8fe8e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-8fe8e",
    storageBucket: "todo-8fe8e.appspot.com",
    messagingSenderId: "850023828360",
    appId: "1:850023828360:web:48a01b8a28b60649bb083d",
    measurementId: "G-2750K64E5Z"
};
const myapp=firebase.initializeApp(firebaseConfig);
export const auth = myapp.auth();