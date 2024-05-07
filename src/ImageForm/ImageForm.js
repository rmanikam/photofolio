import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import styles from "../ImageForm/ImageForm.module.css";
import { toast } from "react-toastify";
const ImageForm = (props) => {
  const { albumId, name, imageId, title, imageUrl, showForm } = props;
  const [localTitle, setLocalTitle] = useState(title);
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setLocalImageUrl(e.target.value);
  };
  const createImage = async () => {
    if (!imageId) {
      await addDoc(collection(db, "images"), {
        title: title,
        albumId: albumId,
        imageUrl: imageUrl,
      });
      toast.success("Image added successfully.");
    } else {
      await updateDoc(doc(db, "images", imageId), {
        title: localTitle,
        albumId: albumId,
        imageUrl: localImageUrl,
      });
      toast.success("Image updated successfully.");
    }
    clearInput();
  };
  const clearInput = () => {
    console.log("e1");
    setLocalTitle("");
    setLocalImageUrl("");
    showForm();
  };

  return (
    <div className={styles.form}>
      {imageId ? <h1>Update Image {title} </h1> : <h1>Add Image to {name} </h1>}
      <div className={styles.innerContainer}>
        <input
          type="text"
          placeholder="Title"
          onChange={handleTitleChange}
          value={localTitle}
        ></input>
        <input
          type="text"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={localImageUrl}
        ></input>
      </div>
      <div className={styles.button}>
        <button className={styles.btnClear} onClick={clearInput}>
          Clear
        </button>
        {imageId ? (
          <button className={styles.btnCreate} onClick={createImage}>
            Update
          </button>
        ) : (
          <button className={styles.btnCreate} onClick={createImage}>
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
