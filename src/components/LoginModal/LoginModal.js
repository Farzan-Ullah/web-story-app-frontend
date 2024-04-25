import React, { useState } from "react";

import styles from "./LoginModal.module.css";

import { loginUser } from "../../apis/userAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleModalClose = () => {
    setFormData({ username: "", password: "" });
    onClose();
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    try {
      await loginUser(formData);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <h2>Log In to SwipTory</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">Username: </label>
              <input
                type={"text"}
                id="name"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="passcode">Password: </label>
              <input
                type={"password"}
                id="passcode"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmit}>Log In</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
