import React, { useState } from "react";
import styles from "./Navbar.module.css";
import RegisterModal from "../RegisterModal/RegisterModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SwipTory</div>
        <div className={styles.navBtns}>
          <button className={styles.registerBtn} onClick={openModal}>
            Register Now
          </button>
          <button className={styles.loginBtn}>Sign In</button>
        </div>
      </nav>
      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
      <br />
    </div>
  );
}
