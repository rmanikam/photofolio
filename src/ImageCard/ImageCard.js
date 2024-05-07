import React, { useState } from "react";
import styles from "../ImageCard/ImageCard.module.css";
import CarouselComponent from "../Carousel/CarouselComponent";
import deleteBtn from "../assets/delete-button.png";

const ImageCard = (props) => {
  const {
    url,
    title,
    image,
    editIcon,
    deleteIcon,
    editImage,
    deleteImage,
    albumId,
  } = props;
  const [show, setShow] = useState(false);

  const showCarousel = () => {
    setShow(!show);
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        <div className={styles.hover}>
          <img
            src={editIcon}
            alt="edit button"
            className={styles.edit}
            onClick={() => editImage({ image, title, url })}
          />

          <img
            src={deleteIcon}
            alt="delete button"
            className={styles.delete}
            onClick={() => deleteImage(image.id)}
          />
        </div>
        <img
          src={url}
          alt="images"
          className={styles.url}
          onClick={showCarousel}
        />
        <p>{title}</p>
      </div>

      {show ? (
        <CarouselComponent
          albumId={albumId}
          deleteBtn={deleteBtn}
          showCarousel={showCarousel}
        />
      ) : null}
    </div>
  );
};

export default ImageCard;
