import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/userAuth";
import styles from "./RegisterModal.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const RegisterModal = ({ isOpen, onClose }) => {
  // const [user, setUser] = useState("");
  // const [pass, setPass] = useState("");

  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

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
    setFormSubmitted(true);

    if (!formData.username || !formData.password) {
      return;
    }

    await registerUser(formData);
    // Close the modal only if registration is successful
  };
  // const isUserExist = await registerUser(formData);
  // if (!isUserExist) {
  //   toast.error(isUserExist.errorMessage);
  // } else {
  //   // Display success toast
  //   toast.success("Registration successfull");
  // } // Display error toast

  // Handle registration failure

  // await registerUser(formData);
  // try {
  //   const response = await registerUser(formData);
  //   if (response.success) {
  //     toast.success("Registration successful");
  //   } else {
  //     toast.error(response.message); // Display error message from the server
  //   }
  // } catch (error) {
  //   console.log(error);
  //   // Handle registration failure
  // }
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
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass">Password: </label>
              <input
                type={"password"}
                id="pass"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {formSubmitted && (!formData.username || !formData.password) && (
              <p className={styles.error}>Fields can't be empty</p>
            )}

            <button onClick={handleSubmit}>Register</button>
          </div>
        </div>
      )}
      {/* <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
      /> */}
    </>
  );
};

export default RegisterModal;
