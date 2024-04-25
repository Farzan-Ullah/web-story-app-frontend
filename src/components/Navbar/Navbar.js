import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import StoryModal from "../StoryModal/StoryModal";
import { getUserDetails } from "../../apis/userAuth";

export default function Navbar() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  const openStoryModal = () => {
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
  };

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
  const handleSuccessfulRegistration = (username) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    setUsername(username);
    localStorage.setItem("username", username);
    closeRegisterModal();
  };

  const handleSuccessfulLogin = (username) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    setUsername(username);
    localStorage.setItem("username", username);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setUsername("");
    localStorage.removeItem("username");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown menu state
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SwipTory</div>
        <div className={styles.navBtns}>
          {isLoggedIn ? (
            <>
              <button
                className={styles.bookmarkBtn}
                onClick={openRegisterModal}
              >
                Bookmark
              </button>
              <button className={styles.addstoryBtn} onClick={openStoryModal}>
                Add Story
              </button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                className={styles.profileIcon}
              />
              <div className={styles.navItem} onClick={toggleDropdown}>
                <div className={styles.hamburgerMenu}>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <p>{username}</p>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className={styles.registerBtn}
                onClick={openRegisterModal}
              >
                Register Now
              </button>
              <button className={styles.loginBtn} onClick={openLoginModal}>
                Sign In
              </button>
            </>
          )}
        </div>
      </nav>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSuccess={handleSuccessfulRegistration}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={handleSuccessfulLogin}
      />
      <StoryModal isOpen={isStoryModalOpen} onClose={closeStoryModal} />
      <br />
    </div>
  );
}
