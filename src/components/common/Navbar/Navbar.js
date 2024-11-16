import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          VisaPay
        </Link>
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`navbar-content ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/transactions" className="nav-link">Transactions</Link>
          <div className="dropdown">
            <span className="nav-link">Services</span>
            <div className="dropdown-content">
              <Link to="/send-money" className="dropdown-link">Send Money</Link>
              <Link to="/exchange-rates" className="dropdown-link">Exchange Rates</Link>
              <Link to="/cards" className="dropdown-link">Cards</Link>
            </div>
          </div>
        </div>

        <div className="navbar-auth">
          <Button
            variant="outlined"
            size="small"
          >
            Login
          </Button>
          <Button
            variant="primary"
            size="small"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
