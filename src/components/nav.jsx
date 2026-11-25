import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo_image.png";
const Navbar = ({ onAuthClick }) => {
  return (
    <nav className="navbar">

      <div className="nav_logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav_links">
        <a href="#about">About Us</a>
        <a href="#how-it-works">How We Work</a>
        <a href="#volunteer">Role of Volunteer</a>
        <a href="#ngo">Role of NGO</a>
      </div>

      <div className="nav_auth">
        <button onClick={() => onAuthClick("login")}>
          Login
        </button>

        <button onClick={() => onAuthClick("signup")}>
          Sign Up
        </button>
      </div>

    </nav>
  );
};

export default Navbar;