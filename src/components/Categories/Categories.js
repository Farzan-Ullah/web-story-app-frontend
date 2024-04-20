import React from "react";
import styles from "./Categories.module.css";
export default function Categories() {
  return (
    <div>
      <div className={styles.categorySection}>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://www.gmfus.org/sites/default/files/styles/medium_header_650_x_850/public/2021-07/shutterstock_1674892387.jpg.webp?itok=Mxiz8L4m")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>All</h2>
          </div>
        </div>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>Food</h2>
          </div>
        </div>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://eos.org/wp-content/uploads/2019/12/earth-at-night-from-space.jpg")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>World</h2>
          </div>
        </div>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://static.vecteezy.com/system/resources/thumbnails/022/995/026/small_2x/interior-of-a-modern-gym-with-fitness-equipment-generative-ai-photo.jpg")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>Health & Fitness</h2>
          </div>
        </div>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://ibc-static.broad.msu.edu/sites/globaledge/blog/57295.jpg")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>Gaming</h2>
          </div>
        </div>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage:
              'url("https://rockresearch.com/wp-content/uploads/2017/11/event_technology.jpg")',
          }}
        >
          <div className={styles.cardContent}>
            <h2>Technology</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
