import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "../Carousel/Carousel.module.css";

const CarouselComponent = ({ albumId, deleteBtn, showCarousel }) => {
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  function handleChange(index) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "images"), (snapshot) => {
      const output = snapshot.docs
        .filter((doc) => doc.data().albumId === albumId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setImageData(output);
    });
    return () => {
      unsubscribe();
    };
  }, [albumId]);

  console.log("images", imageData);

  const close = () => {
    showCarousel();
  };
  return (
    <>
      <div className={styles.Container}>
        <>
          <Carousel
            showArrows={true}
            autoPlay={false}
            infiniteLoop={true}
            selectedItem={imageData[currentIndex]}
            onChange={handleChange}
            className="carousel-container"
          >
            {imageData.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={styles.image}
                  />
                </div>
              );
            })}
          </Carousel>
        </>
      </div>

      <img
        src={deleteBtn}
        alt="delete"
        className={styles.close}
        onClick={close}
      />
    </>
  );
};

export default CarouselComponent;
