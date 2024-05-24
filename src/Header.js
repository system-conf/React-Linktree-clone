import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Header.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = ({ darkMode, toggleDarkMode }) => {
  const handleLogout = () => {
    firebase.auth().signOut();
    return <Navigate to="/" />;
  };
  return (
    <nav className="header">
      <ul className="nav-links">
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/hesaplayici">Hesaplayıcı</Link>
        </li>
        <li>
          <button onClick={toggleDarkMode} className="dark-mode-button">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
        {/* <li>
          <button className="dark-mode-button" onClick={handleLogout}>
           x
          </button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
