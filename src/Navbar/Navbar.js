import React from "react";
import logo from "../assets/logo.png";
import styles from "../Navbar/Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.logoContainer}>
      <img
        src={logo}
        alt="photofolio_logo"
        className={styles.photofolio_logo}
      />
      <h3>PhotoFolio</h3>
    </div>
  );
};

export default Navbar;
