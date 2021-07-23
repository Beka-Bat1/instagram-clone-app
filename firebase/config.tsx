import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByVKqefJFJeLi5BodGhLG6qenErsKXeEE",
  authDomain: "instagram-clone-app-55246.firebaseapp.com",
  projectId: "instagram-clone-app-55246",
  storageBucket: "instagram-clone-app-55246.appspot.com",
  messagingSenderId: "460160162085",
  appId: "1:460160162085:web:c7a4337d3476989b8762cc",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
