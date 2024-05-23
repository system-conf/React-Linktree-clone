import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className="header">
            <ul className="nav-links">
                <li><Link to="/">Ana Sayfa</Link></li>
                <li><Link to="/hesaplayici">Hesaplayıcı</Link></li>
                <li>
                    <button onClick={toggleDarkMode} className="dark-mode-button">
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
