import React, { useState, useEffect, useRef } from "react";
import styles from "../Categories/Categories.module.css";
import {  getStoryById } from "../../apis/stories";
import { useParams, Link } from "react-router-dom";
import {
  updateUserBookmarks,
  updateUserLikes,
  // deleteUserBookmarks,
  getUserById,
} from "../../apis/userAuth";

export default function ViewStory() {
  const [fullStoryCard, setFullStoryCard] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const bookmarkRef = useRef();
  const likeRef = useRef();

  useEffect(() => {
    fetchStoryDetails(id);
  }, [id]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      getUserById().then((data) => {
        setUserData(data);
      });
    }
  }, [fullStoryCard]);

  useEffect(() => {
    const progressBars = document.querySelectorAll(
      ".Categories_progress__NreNN"
    );
    if (fullStoryCard) {
      setTimeout(() => {
        progressBars[currentSlide].style.transitionProperty = "width";
        progressBars[currentSlide].style.width = "100%";
      }, 10);
    }
    const storyInterval = fullStoryCard
      ? setInterval(() => {
          if (currentSlide < fullStoryCard.storyDetails.heading.length - 1) {
            progressBars[currentSlide].style.transitionProperty = "width";
            progressBars[currentSlide].style.width = "100%";
            setCurrentSlide((prev) => prev + 1);
          } else {
            clearInterval(storyInterval);
          }
        }, 4000)
      : null;

    return () => clearInterval(storyInterval);
  }, [fullStoryCard, currentSlide]);

  const nextStorySlide = () => {
    if (currentSlide < fullStoryCard.storyDetails.heading.length - 1) {
      const progressBars = document.querySelectorAll(
        ".Categories_progress__NreNN"
      );
      progressBars[currentSlide].style.transitionProperty = "none";
      progressBars[currentSlide].style.width = "100%";
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevStorySlide = () => {
    if (currentSlide > 0) {
      const progressBars = document.querySelectorAll(
        ".Categories_progress__NreNN"
      );
      progressBars.forEach((progress, index) => {
        if (currentSlide - 1 <= index) {
          progress.style.transitionProperty = "none";
          progress.style.width = "0";
        }
      });
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const shareStory = () => {
    const url = window.location.origin + "/view_story/" + id;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard:", url);
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  const bookmarkStory = async (id) => {
    try {
      if (!isLoggedIn) {
        // Handle case where user is not logged in
        return;
      }
    const index = userData.user.userbookmarks.indexOf(id);

    if (index !== -1) {
      // If story is already bookmarked, remove it
      userData.user.userbookmarks.splice(index, 1);
    } else {
      // If story is not bookmarked, add it
      userData.user.userbookmarks.push(id);
    }

    // Update the user's bookmarks in the backend
    const response = await updateUserBookmarks(userData.id);
    if (response && response.success) {
      // Update the component state with the modified user data
      setUserData(userData);
    }
  }
    catch (error) {
      console.error('Error bookmarking story:', error);
    }
    // deleteUserBookmarks(userId);
  };

  const likeStory = (id) => {
    updateUserLikes(id);
  };

  const fetchStoryDetails = (id) => {
    getStoryById(id).then((data) => {
      setFullStoryCard(data);
    });
  };

  const createProgressBars = () => {
    let progressBars = [];
    for (let i = 0; i < fullStoryCard.storyDetails.heading.length; i++) {
      progressBars.push(
        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>
      );
    }
    return progressBars;
  };

  const fullStoryGenerator = () => (
    <div className={styles.fullStoryOverlay} style={{ background: "#000" }}>
       <div className={styles.fullStoryContainer}>
        <button className={styles.slideNavBtns} onClick={prevStorySlide}>
          &#8249;
        </button>
        <div
          className={`${styles.fullStoryCard} ${styles.cardsOverlay}`}
          style={{
            backgroundImage: `url("${fullStoryCard.storyDetails.image[currentSlide]}")`,
          }}
        >
          <div className={styles.fullStoryContent}>
            <div className={styles.fullStoryContent}>
              <div className={styles.progressBars}>{createProgressBars()}</div>
            </div>
            <div className={styles.actionBtnsUp}>
              <Link to="/">X</Link>
              <button
                onClick={() => shareStory(fullStoryCard.storyDetails._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
              </button>
            </div>
            <div className={styles.textContent}>
              <h3>{fullStoryCard.storyDetails.heading[currentSlide]}</h3>
              <p>{fullStoryCard.storyDetails.description[currentSlide]}</p>
            </div>
          </div>
          <div className={styles.actionBtns}>
            <button
              ref={bookmarkRef}
              onClick={() => bookmarkStory(fullStoryCard.storyDetails._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </svg>
            </button>
            <button
              ref={likeRef}
              onClick={() => likeStory(fullStoryCard.storyDetails._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
              </svg>
            </button>
          </div>
        </div>
        <button className={styles.slideNavBtns} onClick={nextStorySlide}>
          &#8250;
        </button>
      </div>
    </div>
  );
  return (
    <>
      <div className={styles.fullStory}>
        {fullStoryCard && fullStoryGenerator()}
      </div>
    </>
  );
}
