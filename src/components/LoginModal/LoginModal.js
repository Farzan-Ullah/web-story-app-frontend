import React, { useState } from "react";

import styles from "./LoginModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../apis/userAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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

    try {
      await loginUser(formData);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${styles.loginForm}`}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <h2>Log In to SwipTory</h2>
            <div className={styles.loginFormGroup}>
              <label htmlFor="name">Username: </label>
              <input
                type={"text"}
                id="name"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </div>
            <div className={styles.loginFormGroup}>
              <label htmlFor="passcode">Password </label>
              <input
                // ref={passwordInputRef}
                // type={"password"}
                type={passwordVisible ? "text" : "password"}
                id="passcode"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className={styles.eyeBtn}
              onClick={togglePasswordVisibility}
            >
              {" "}
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
            {formSubmitted && (!formData.username || !formData.password) && (
              <p className={styles.error}>Fields can't be empty</p>
            )}
            <button onClick={handleSubmit}>LogIn</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
