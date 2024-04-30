import React from "react";
import styles from "./BookmarkPage.module.css";
import { Link } from "react-router-dom";
import { getBookmarks } from "../../apis/userAuth";

export default function BookmarkPage() {

  const myBookmarks = () => {
    getBookmarks()
  }
  myBookmarks()
  return (
    <>
      <div className={styles.bookmarkContainer}>
        <h2>You have no bookmarks!</h2>
        <img
          src="https://swiptory001.netlify.app/static/media/Curiosity.c261393e5f3fd01fa79a.png"
          alt=""
        />
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
}
