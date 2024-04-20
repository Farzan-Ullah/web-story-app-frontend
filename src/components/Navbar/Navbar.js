import React from "react";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SwipTory</div>
        <div className={styles.navBtns}>
          <button className={styles.registerBtn}>Register Now</button>
          <button className={styles.loginBtn}>Sign In</button>
        </div>
      </nav>
      <br />
    </div>
  );
}
