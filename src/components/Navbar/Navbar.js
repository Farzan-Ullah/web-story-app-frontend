// import React, { useState } from "react";
// import styles from "./Navbar.module.css";
// import RegisterModal from "../RegisterModal/RegisterModal";
// import LoginModal from "../LoginModal/LoginModal";

// export default function Navbar() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <nav className={styles.navbar}>
//         <div className={styles.logo}>SwipTory</div>
//         <div className={styles.navBtns}>
//           <button className={styles.registerBtn} onClick={openModal}>
//             Register Now
//           </button>
//           <button className={styles.loginBtn} onClick={openModal}>
//             Sign In
//           </button>
//         </div>
//       </nav>
//       <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
//       <LoginModal isOpen={isModalOpen} onClose={closeModal} />
//       <br />
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

export default function Navbar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SwipTory</div>
        <div className={styles.navBtns}>
          {isLoggedIn && (
            <button className={styles.registerBtn} onClick={openRegisterModal}>
              Log Out
            </button>
          )}
          {!isLoggedIn && (
            <button className={styles.registerBtn} onClick={openRegisterModal}>
              Register Now
            </button>
          )}
          {!isLoggedIn && (
            <button className={styles.loginBtn} onClick={openLoginModal}>
              Sign In
            </button>
          )}
        </div>
      </nav>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <br />
    </div>
  );
}
