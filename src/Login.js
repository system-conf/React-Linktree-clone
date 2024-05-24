import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import './Login.css'

const Login = () => {
  const currentUser = firebase.auth().currentUser;
  const [redirectToUpload, setRedirectToUpload] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setRedirectToUpload(true);
    }
  }, [currentUser]);

  if (redirectToUpload) {
    return <Navigate to="/Home" />;
  }

  return (
    <div>
      <LoginForm setRedirectToUpload={setRedirectToUpload} />
    </div>
  );
};

const LoginForm = ({ setRedirectToUpload }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setSuccessMessage("Başarılı giriş!");
      setRedirectToUpload(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setSuccessMessage("Başarılı kayıt!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="upload" >
      <div className="login-bar">
        <input style={{marginTop:10}} className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="login-input"
          color="white"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{
          display: "flex", width: "100%", overflow: "hidden", borderRadius: 20,
          gap:20,padding: " 5 10 5 10", marginBottom: 10
        }}>
          <button
          className="login-input-buton"
          onClick={handleLogin}>Giriş Yap</button>
          {/* <button  className="login-input-buton" onClick={handleRegister}>Kayıt Ol</button> */}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
