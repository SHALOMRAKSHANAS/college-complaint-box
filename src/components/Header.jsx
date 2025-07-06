import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-bar">
      <h1>🏫 College Complaint Box</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Admin Login</Link>
      </nav>
    </header>
  );
}

export default Header;
