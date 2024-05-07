import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../AlbumsList/AlbumList.module.css";
import { db } from "../firebase";
import ImagesList from "../ImagesList/ImagesList";
import AlbumForm from "../AlbumForm/AlbumForm";
import logoImages from "../assets/logo";
import ClipLoader from "react-spinners/ClipLoader";

const AlbumsList = () => {
  const [albumList, setAlbumList] = useState([]);
  const [albumId, setAlbumId] = useState(null);
  const [show, setShow] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const getData = await getDocs(collection(db, "albums"));
      const albumData = [];
      getData.forEach((doc) => {
        albumData.push({ id: doc.id, name: doc.data().name }); // [{}]
      });
      setAlbumList(albumData);
    } catch {
      console.log("Error");
    }
  };
  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const addAlbum = async (name) => {
    setShow(!show);
    try {
      await addDoc(collection(db, "albums"), {
        name: name,
      });

      fetchData();
    } catch {
      console.log("Error");
    }
  };

  const back = () => {
    setAlbumId(null);
  };

  const openAlbum = (props) => {
    // why doesnt this work
    // return <ImagesList />;
    setAlbumId(props.id);
    setAlbumName(props.name);
  };

  const deleteAlbum = async (id) => {
    const docRef = doc(db, "albums", id);
    await deleteDoc(docRef);
    toast("Album deleted successfully");
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
    <div className={styles.outerContainer}>
      {show ? <AlbumForm addAlbum={addAlbum} /> : null}
      {albumList.length === 0 && <h1>No Albums found .</h1>}
      {!albumId && (
        <div className={styles.head}>
          <h1>Your Albums</h1>

          <button
            style={{
              backgroundColor: show
                ? "rgba(255, 19, 0, .1)"
                : "rgba(0, 119, 255, 0.1)",
              color: show ? "#ff1300" : "#07f",
            }}
            onClick={addAlbum}
            className={styles.Btn}
          >
            {show ? "Cancel" : "Add album"}
          </button>
        </div>
      )}
      {!albumId && albumList.length > 0 && (
        <div className={styles.list}>
          {albumList.map((album) => {
            return (
              <div className={styles.albumContainer} key={album.id}>
                <img
                  src={logoImages.album}
                  alt="albumImage"
                  onClick={() => openAlbum({ id: album.id, name: album.name })}
                  className={styles.album}
                />
                <img
                  src={logoImages.trashbin}
                  alt="deleteAlbum"
                  onClick={() => deleteAlbum(album.id)}
                  className={styles.delete}
                />
                <span className={styles.name}>{album.name}</span>
              </div>
            );
          })}
        </div>
      )}

      {albumId && <ImagesList albumId={albumId} back={back} name={albumName} />}
    </div>
  );
};

export default AlbumsList;
