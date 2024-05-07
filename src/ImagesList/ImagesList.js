import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import styles from "../ImagesList/ImageList.module.css";
import "react-toastify/dist/ReactToastify.css";
import ImageForm from "../ImageForm/ImageForm";
import backIcon from "../assets/back.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/trash-bin.png";
import ImageCard from "../ImageCard/ImageCard";
import ClipLoader from "react-spinners/ClipLoader";
import search from "../assets/search.png";
import deleteBtn from "../assets/delete-button.png";

const ImagesList = (props) => {
  const { albumId, back, name } = props;
  const [imageId, setImageId] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
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
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, [albumId]);

  const showForm = () => {
    setShow(!show);
  };
  console.log("imageData", imageData);

  const editImage = ({ image, title, url }) => {
    setImageId(image.id);
    setTitle(title);
    setShow(true);
    setImageUrl(url);
  };
  const deleteImage = async (id) => {
    await deleteDoc(doc(db, "images", id));
    toast("Image deleted successfully.");
  };
  const showSearch = () => {
    setShowInput(!showInput);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };
  if (loading) {
    return (
      <ClipLoader
        color={"blue"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div>
      {imageData.length === 0 && <h1>No images found in the album.</h1>}
      {show && (
        <ImageForm
          albumId={albumId}
          name={name}
          imageId={imageId}
          setImageId={setImageId}
          title={title}
          imageUrl={imageUrl}
          showForm={showForm}
        />
      )}
      <div className={styles.navbar}>
        <img
          src={backIcon}
          alt="back button"
          className={styles.backButton}
          onClick={back}
        />
        <h1 className={styles.heading}>Images in {name}</h1>
        {showInput ? (
          <img
            src={deleteBtn}
            alt="delete"
            className={styles.deleteBtn}
            onClick={showSearch}
          />
        ) : (
          <img
            src={search}
            alt="searchIcon"
            className={styles.search}
            onClick={showSearch}
          />
        )}
        {showInput ? (
          <input
            type="text"
            onChange={handleSearch}
            className={styles.input}
            placeholder="Search Image here..."
            value={searchInput}
          />
        ) : null}

        <button
          style={{
            backgroundColor: show
              ? "rgba(255, 19, 0, .1)"
              : "rgba(0, 119, 255, 0.1)",
            color: show ? "#ff1300" : "#07f",
          }}
          onClick={() => showForm()}
          className={styles.button}
        >
          {show ? "Cancel" : "Add Image"}
        </button>
      </div>

      {imageData
        .filter((image) => {
          return search.toLocaleLowerCase === ""
            ? image
            : image.title.toLocaleLowerCase().includes(searchInput);
        })
        .map((image, i) => {
          return (
            <ImageCard
              url={image.imageUrl}
              key={i}
              title={image.title}
              image={image}
              editIcon={editIcon}
              deleteIcon={deleteIcon}
              editImage={editImage}
              deleteImage={deleteImage}
              albumId={albumId}
            />
          );
        })}
    </div>
  );
};

export default ImagesList;
