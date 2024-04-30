import React, { useEffect, useState } from "react";
import styles from "./StoryModal.module.css";
import { createStories, getFullStories } from "../../apis/stories";

const StoryModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    image: "",
    category: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesData, setSlidesData] = useState({
    heading: [],
    description: [],
    image: [],
    category: "",
  });

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

  const handleSlidesData = () => {
    setFormSubmitted(true);
    const slideButtons = document.querySelectorAll("input[type='radio']");
    if (
      !formData.heading ||
      !formData.description ||
      !formData.image ||
      !formData.category
    ) {
      return false;
    }

    const { heading, description, image, category } = formData;

    setSlidesData((prevData) => ({
      heading: [
        ...prevData.heading.slice(0, currentSlide - 1),
        heading,
        ...prevData.heading.slice(currentSlide),
      ],
      description: [
        ...prevData.description.slice(0, currentSlide - 1),
        description,
        ...prevData.description.slice(currentSlide),
      ],
      image: [
        ...prevData.image.slice(0, currentSlide - 1),
        image,
        ...prevData.image.slice(currentSlide),
      ],
      category: category,
    }));

    if (currentSlide < slideButtons.length) {
      slideButtons[currentSlide].click();
    }
  };

  const handlePrevSlide = () => {
    const slideButtons = document.querySelectorAll("input[type='radio']");
    if (currentSlide > 1) {
      slideButtons[currentSlide - 2].click();
    }
  };

  const handleCurrentSLide = (event) => {
    // setFormSubmitted(true);
    // if (
    //   !formData.heading ||
    //   !formData.description ||
    //   !formData.image ||
    //   !formData.category
    // ) {
    //   return false;
    // }
    setCurrentSlide(event.target.value);
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);
    if (
      !formData.heading ||
      !formData.description ||
      !formData.image ||
      !formData.category
    ) {
      return false;
    }

    if (slidesData.heading.length >= 3) {
      await createStories(slidesData);
    }

    onClose();
  };

  const addSlides = () => {
    if (totalSlides < 3) {
      setTotalSlides((prev) => (prev += 1));
    }
  };

  const removeSlides = () => {
    if (totalSlides > 0) {
      setTotalSlides((prev) => (prev -= 1));
    }
  };

  const createSlides = () => {
    let slides = [];
    for (let i = 0; i < totalSlides; i++) {
      slides.push(
        <div>
          <input
            type="radio"
            value={`${i + 4}`}
            name="slide-selector"
            id={`selector-${i + 4}`}
            onChange={(event) => handleCurrentSLide(event)}
          />
          <label
            htmlFor={`selector-${i + 4}`}
            className={`${styles.slideSelector} ${styles.slideSelectorDynamic}`}
          >
            Slide {i + 4} <span onClick={removeSlides}>X</span>
          </label>
        </div>
      );
    }
    return slides;
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${styles.storiesForm}`}>
            <div className={styles.close} onClick={handleModalClose}>
              &#10006;
            </div>
            <p>Add upto 6 Slides</p>
            <div className={styles.slidesSelectors}>
              <div>
                <input
                  type="radio"
                  value="1"
                  name="slide-selector"
                  id="selector-1"
                  onChange={(event) => handleCurrentSLide(event)}
                />
                <label htmlFor="selector-1" className={styles.slideSelector}>
                  Slide 1
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  value="2"
                  name="slide-selector"
                  id="selector-2"
                  onChange={(event) => handleCurrentSLide(event)}
                />
                <label htmlFor="selector-2" className={styles.slideSelector}>
                  Slide 2
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  value="3"
                  name="slide-selector"
                  id="selector-3"
                  onChange={(event) => handleCurrentSLide(event)}
                />
                <label htmlFor="selector-3" className={styles.slideSelector}>
                  Slide 3
                </label>
              </div>
              {createSlides()}
              {totalSlides < 3 && (
                <div className={styles.slideSelector} onClick={addSlides}>
                  Add +
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="heading">Heading: </label>
              <input
                type={"text"}
                id="heading"
                name="heading"
                placeholder="Your Heading"
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
                placeholder="Story Description"
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
                placeholder="Add Image url"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.categorySelect}`}>
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                disabled={currentSlide <= 1 ? false : true}
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

            <div className={styles.ErrorSection}>
              {formSubmitted &&
                (!formData.heading ||
                  !formData.description ||
                  !formData.image ||
                  !formData.category) && <p>Please fill out all fields</p>}
            </div>
            <br />
            <div className={styles.slideNavBtns}>
              <button className={styles.prevBtn} onClick={handlePrevSlide}>
                Previous
              </button>
              <button className={styles.nextBtn} onClick={handleSlidesData}>
                Next
              </button>
              <button className={styles.postBtn} onClick={handleSubmit}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryModal;
