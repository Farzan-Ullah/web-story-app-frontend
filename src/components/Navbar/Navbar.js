import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import StoryModal from "../StoryModal/StoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  // const navigate = useNavigate();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isBookmarksClicked, setIsBookmarksClicked] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, [username, isLoggedIn]);

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
  const handleSuccessfulRegistration = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    // setUsername(username);
    // localStorage.setItem("username", username);
    closeRegisterModal();
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    // setUsername(username);
    // localStorage.setItem("username", username);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("token"); 
    setUsername("");
    localStorage.removeItem("username");
  };

  const dropDownHandler = () => {
    if (dropdownRef.current.style.display === "none") {
      dropdownRef.current.style.display = "block";
    } else {
      dropdownRef.current.style.display = "none";
    }
  };

  // const handleBookmarkClick = () => {
  //   navigate("/userbookmarks"); // Step 3: Navigate to the desired route
  //   document.body.requestFullscreen(); // Step 4: Enter full-screen mode
  // };

  // const handleBookmarkClick = () => {
  //   setIsBookmarksClicked(true); // Set the state to true when bookmarks are clicked
  //   navigate("/userbookmarks");
  // };

  return (
    <div>
      {/* {!isBookmarksClicked && ( */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>SwipTory</div>
        <div className={styles.navBtns}>
          {isLoggedIn ? (
            <>
              <div className={styles.storyBtns}>
                <Link
                  to="/bookmarks"
                  className={styles.bookmarkBtn}
                  // onClick={() => {
                  //   navigate("/userbookmarks");
                  // }}
                  // onClick={handleBookmarkClick}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                  &nbsp; Bookmarks
                </Link>
                <button className={styles.addstoryBtn} onClick={openStoryModal}>
                  Add Story
                </button>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                className={styles.profileIcon}
              />
              <div className={styles.navItem}>
                <div className={styles.hamburgerMenu} onClick={dropDownHandler}>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                </div>
                <div
                  style={{ display: "none" }}
                  className={styles.dropdownContent}
                  ref={dropdownRef}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {username}
                  </p>
                  <Link to="/" className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
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
      {/* )} */}
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
