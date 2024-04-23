import React, { useState } from "react";

import styles from "./LoginModal.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/userAuth";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleModalClose = () => {
    setFormData("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    try {
      // Attempt login
      const result = await loginUser(formData);
      if (result) {
        navigate("/"); // Redirect to home route upon successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, e.g., display error message to user
    }
    // // const result =
    // await loginUser(formData);
    // // if (result) {
    // //   navigate("/");
    // // }
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
