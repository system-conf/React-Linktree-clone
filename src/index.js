import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/storage"; // Firebase Storage için gerekli modülü ekleyin
import firebaseConfig from "./firebaseconf"; // Firebase config dosyasını içe aktarın

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
