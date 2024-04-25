import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { getFullStories } from "../../apis/stories";
export default function Categories() {
  const [categoryState, setCategory] = useState("All");
  const [allStories, setAllStories] = useState([]);
  const [storyState, setStory] = useState([]);
  // const [storyState, setStory] = useState([
  //   { heading: "", description: "", image: "", category: "" },
  // ]);

  useEffect(() => {
    getFullStories().then((data) => {
      setStory(data);
    });
  }, []);

  const set = (category) => {
    setCategory(category);
  };

  const categoryData = [
    {
      category: "All",
      image:
        "https://www.gmfus.org/sites/default/files/styles/medium_header_650_x_850/public/2021-07/shutterstock_1674892387.jpg.webp?itok=Mxiz8L4m",
    },
    {
      category: "Food",
      image:
        "https://st3.depositphotos.com/1194063/15070/i/450/depositphotos_150709644-stock-photo-various-herbs-and-spices.jpg",
    },
    {
      category: "Health and Fitness",
      image:
        "https://t4.ftcdn.net/jpg/02/24/51/53/360_F_224515382_RdooMfTyGSLFU0C3Pfk2rbjVqUy1UrZl.jpg",
    },
    {
      category: "Travel",
      image:
        "https://promos.makemytrip.com/notification/xhdpi/BusinessTravel1.jpg",
    },
    {
      category: "Movie",
      image:
        "https://t3.ftcdn.net/jpg/04/13/48/36/360_F_413483676_NZfIguSYWKbiwDBThZ55tEYgfePoqah4.jpg",
    },
    {
      category: "Education",
      image:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
    },
  ];

  // const storiesData = [
  //   { story: "Burger", type: "Food" },
  //   { story: "Pasta", type: "Food" },
  //   { story: "Protien", type: "Health and Fitness" },
  //   { story: "Gym", type: "Health and Fitness" },
  //   { story: "Hollywood", type: "Movie" },
  //   { story: "Bollywood", type: "Movie" },
  //   { story: "Planes", type: "Travel" },
  //   { story: "Trains", type: "Travel" },
  //   { story: "Mathematics", type: "Education" },
  //   { story: "Science", type: "Education" },
  // ];

  // const filterStoriesByCategory = () => {
  //   if (categoryState === "All") {
  //     return allStories; // Return all stories if category is "All"
  //   } else {
  //     return allStories.filter((story) => story.category === categoryState); // Filter stories based on selected category
  //   }
  // };

  const categoryGenerator = () =>
    categoryData.map((category, index) => (
      <div
        key={index}
        className={styles.categorySection}
        onClick={() => set(category.category)}
      >
        <div
          className={styles.categoryCard}
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className={styles.categoryContent}>
            <h2>{category.category}</h2>
          </div>
        </div>
      </div>
    ));

  // const storyGenerator = () => {
  // storiesData
  //   .filter(
  //     (storyState) =>
  //       storyState.type === categoryState || categoryState === "All"
  //   )
  // const filteredStories = filterStoriesByCategory();
  // };

  const generateStories = () =>
    storyState.data.map((story, index) => (
      <div key={index} className={styles.categorySection}>
        <div
          className={styles.categoryCard}
          style={{
            backgroundImage: `url("${story.image}")`,
          }}
        >
          <div className={styles.cardContent}>
            <h2>{story.heading}</h2>
            <p>{story.description}</p>
          </div>
        </div>
      </div>
    ));
  return (
    <>
      <div className={styles.categorySection}>{categoryGenerator()}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {generateStories.length > 0 ? generateStories() : "Nothing to show"}
      </div>
    </>
  );
}
