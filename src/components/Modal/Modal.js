import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleModalClose = () => {
    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <h2>Register to SwipTory</h2>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button>Register</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
