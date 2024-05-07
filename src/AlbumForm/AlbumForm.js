import React, { useState } from "react";
import styles from "../AlbumForm/AlbumForm.module.css";
import { toast } from "react-toastify";
const AlbumForm = (props) => {
  const [name, setName] = useState("");
  const { addAlbum } = props;
  const displayName = (e) => {
    setName(e.target.value);
  };

  const clearInput = () => {
    setName("");
  };
  const createAlbum = () => {
    addAlbum(name);
    clearInput();
    toast.success("Album added successfully.");
  };
  return (
    <div className={styles.form}>
      <h2>Create an album</h2>
      <div className={styles.innerContainer}>
        <input
          placeholder="Album Name"
          onChange={(e) => displayName(e)}
        ></input>
        <button className={styles.btnClear} onClick={clearInput}>
          Clear
        </button>
        <button className={styles.btnCreate} onClick={createAlbum}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AlbumForm;
