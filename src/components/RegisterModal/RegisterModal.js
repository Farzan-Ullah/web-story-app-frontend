import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/userAuth";

import styles from "./RegisterModal.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const RegisterModal = ({ isOpen, onClose, onSuccess }) => {
  const passwordInputRef = useRef();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleModalClose = () => {
    setFormData({ username: "", password: "" });
    onClose();
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);

    if (!formData.username || !formData.password) {
      return;
    }

    if (formData.username.length < 8) {
      try {
        await registerUser(formData);
        onSuccess(); // Call the onSuccess function passed from the Navbar component
        localStorage.setItem("username", formData.username);
      } catch (error) {
        console.error(error);
      }

      // await registerUser(formData);
    }
  };

  const passwordVisibility = () => {

    if (passwordInputRef.current.type === "password") {
      passwordInputRef.current.type = "text";
    } else {
      passwordInputRef.current.type = "password";
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${styles.registerForm}`}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <h2>Register to SwipTory</h2>
            <div className={styles.formGroup}>
              <label htmlFor="user">UserName </label>
              <input
                type={"text"}
                id="user"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass">Password </label>
              <input
                ref={passwordInputRef}
                type={"password"}
                id="pass"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button onClick={passwordVisibility}>Eye</button>
            {formSubmitted && (!formData.username || !formData.password) && (
              <p className={styles.error}>Fields can't be empty</p>
            )}

            <button onClick={handleSubmit}>Register</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
