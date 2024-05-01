import React, { useEffect, useState, useRef } from "react";
import styles from "./StoryModal.module.css";
import {
  createStories,
  // getFullStories,
  // getStoryById,
} from "../../apis/stories";

import { updateUserStories } from "../../apis/userAuth";

const StoryModal = ({ isOpen, onClose, postId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const firstSlideRef = useRef();

  useEffect(() => {
    setCurrentSlide(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    if (firstSlideRef) {
      console.log(firstSlideRef);
      // firstSlideRef.current.click();
    }
  }, []);

  const handleModalClose = () => {
    setFormData({
      heading: "",
      description: "",
      image: "",
      category: "",
    });
    onClose();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const newSlides = [...formData.slides];
  //   newSlides[index][name] = value;
  //   setFormData({ slides: newSlides });
  // };

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };

  // const handleCategoryChange = (event, index) => {
  //   const { value } = event.target;
  //   const newSlides = [...formData.slides];
  //   newSlides[index]["category"] = value;
  //   setFormData({ slides: newSlides });
  // };

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
      ...prevData,
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

  const handleCurrentSlide = (event) => {
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
      ...prevData,
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
    setCurrentSlide(event.target.value);
  };

  const userStories = async (id) => {
    updateUserStories(id);
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

    // if (slidesData.heading.length >= 2) {
    await createStories(slidesData);
    // }
    
    await userStories();
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
            onChange={(event) => handleCurrentSlide(event)}
            // onClick={(slideNumber) => handleSlideChange(slideNumber)}
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

  // const handleSlideChange = (slideNumber) => {
  //   if (slideNumber === 2) {
  //     // Clear form data if slide 2 is clicked
  //     setFormData({
  //       heading: "",
  //       description: "",
  //       image: "",
  //     });
  //   }
  //   setCurrentSlide(slideNumber);
  // };

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
                  ref={firstSlideRef}
                  onChange={(event) => handleCurrentSlide(event)}

                  // onClick={handleSlidesData}
                  // onClick={() => handleSlideChange(1)}
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
                  onChange={(event) => handleCurrentSlide(event)}
                  // onClick={handleSlidesData}
                  // onClick={() => handleSlideChange(2)}
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
                  onChange={(event) => handleCurrentSlide(event)}
                  // onClick={handleSlidesData}
                  // onClick={() => handleSlideChange(3)}
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
                // onChange={(e) => handleChange(e, currentSlide - 1)}
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
                // onChange={(e) => handleChange(e, currentSlide - 1)}
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
                // onChange={(e) => handleChange(e, currentSlide - 1)}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.categorySelect}`}>
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                // onChange={(e) => handleCategoryChange(e, currentSlide - 1)}
                disabled={currentSlide <= 1 ? false : true}
              >
                <option value="" selected disabled hidden>
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
