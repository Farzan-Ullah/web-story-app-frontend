// import React, { useState, useEffect } from "react";
import React from "react";
import styles from "./BookmarkPage.module.css";
import { Link } from "react-router-dom";
// import { getFullStories, getStoryById } from "../../apis/stories";
// import { getUserById } from "../../apis/userAuth";

export default function BookmarkPage() {
  // const [savedBookmarks, setSavedBookmarks] = useState();
  // const [userData, setUserData] = useState([]);
  // const [storiesData, setStoriesData] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   getFullStories().then((data) => {
  //     setStoriesData(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("isLoggedIn");
  //   setIsLoggedIn(loggedIn);
  //   if (loggedIn) {
  //     getUserById().then((data) => {
  //       setUserData(data.user);
  //     });
  //   }
  //   console.log(userData.userbookmarks);
  // }, []);

  // const generateStories = () =>
  //   storiesData
  //     .filter((data) => userData.userbookmarks.includes(data._id))
  //     .map((story, index) => (
  //       <div
  //         key={index}
  //         className={`${styles.storyCard} ${styles.cardsOverlay}`}
  //         style={{
  //           backgroundImage: `url("${story.image[0]}")`,
  //         }}
  //         // onClick={() => openFullStoryCard(story._id)}
  //       >
  //         <div className={styles.storyContent}>
  //           <h3>{story.heading[0]}</h3>
  //           <p>{story.description[0]}</p>
  //         </div>
  //       </div>
  //     ));
  return (
    <>
      <div className={styles.bookmarkContainer}>
        {/* {userData.userbookmarks.length > 0 ? (
          <div className={styles.storySectionContainer}>
            <h2>Bookmarks</h2>
            <div className={styles.storySection}>{generateStories()}</div>
          </div>
        ) : (
        )} */}
        <div>
          <h2>You have no bookmarks!</h2>
          <img
            src="https://swiptory001.netlify.app/static/media/Curiosity.c261393e5f3fd01fa79a.png"
            alt=""
          />
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
