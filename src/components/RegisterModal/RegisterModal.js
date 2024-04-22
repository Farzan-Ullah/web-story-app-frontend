import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/userAuth";
import styles from "./RegisterModal.module.css";

const RegisterModal = ({ isOpen, onClose }) => {
  // const [user, setUser] = useState("");
  // const [pass, setPass] = useState("");

  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const handleUsernameChange = (e) => {
  //   setUser(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPass(e.target.value);
  // };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleModalClose = () => {
    // setUser("");
    // setPass("");
    setFormData("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }
    await registerUser(formData);
  };

  useEffect(() => {}, [formData]);

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
              <label htmlFor="user">Username: </label>
              <input
                type={"text"}
                id="user"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass">Password: </label>
              <input
                type={"password"}
                id="pass"
                name="password"
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSubmit}>Register</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
