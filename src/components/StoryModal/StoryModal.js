import React, { useState } from "react";
import styles from "./StoryModal.module.css";
import { createStories, getFullStories } from "../../apis/stories";

const StoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    image: "",
    category: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleModalClose = () => {
    setFormData({
      heading: "",
      description: "",
      image: "",
      category: "",
    }); // Clear form data
    onClose();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };

  const handleSubmit = async () => {
    getFullStories();

    setFormSubmitted(true);
    if (
      !formData.heading ||
      !formData.description ||
      !formData.image ||
      !formData.category
    ) {
      return false;
    }

    await createStories(formData);
  };
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${styles.storiesForm}`}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <div className={styles.slidesSelectors}>
              <div className={`${styles.slideSelector} ${styles.selected}`}>
                Slide 1
              </div>
              <div className={styles.slideSelector}>Slide 2</div>
              <div className={styles.slideSelector}>Slide 3</div>
              <div className={styles.slideSelector}>Add +</div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="heading">Heading: </label>
              <input
                type={"text"}
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="desc">Description: </label>
              <textarea
                rows="4"
                cols="50"
                id="desc"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="img">Image: </label>
              <input
                type={"text"}
                id="img"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
              >
                <option value="" selected disabled>
                  Select Category
                </option>
                <option value="Food">Food</option>
                <option value="Health and Fitness">Health and Fitness</option>
                <option value="Travel">Travel</option>
                <option value="Movie">Movie</option>
                <option value="Education">Education</option>
              </select>
            </div>
            {formSubmitted &&
              (!formData.heading ||
                !formData.description ||
                !formData.image ||
                !formData.category) && (
                <p className={styles.error}>Fields can't be empty</p>
              )}
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryModal;
