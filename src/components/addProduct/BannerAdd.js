import React, { useState, useEffect, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
function BannerAdd() {
  const filePickerRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  function ImageSelect(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
      } else {
        setImage(null);
      }
    } else {
      console.log("please select your file");
    }
  }
  async function AddSubmit(e) {
    e.preventDefault();
    const link = e.target[0].value
    if (loader) return;
    setLoader(true);
    if (image !== null) {
      const uploadTask = storage.ref(`banner/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => console.log(error.message),
        () => {
          storage
            .ref("banner")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("banner")
                .add({
                  id: v4(), 
                  link,
                  url,
                })
                .then(() => {})
                .catch((error) => console.log(error.message));
            });
        }
      );
    } else {
      toast.error("warn");
    }
    e.target[0].value=''
    setImage(null);
    setLoader(false);
  }
  return (
    <div className="col-6 offset-3 mt-5">
      <form id={"addproduct"} onSubmit={AddSubmit}>
        <input type="text" placeholder="Link URL" className="form-control"   />
        <input type="file" hidden ref={filePickerRef} onChange={ImageSelect} />
        {image ? (
          <img src={image} alt="Error!" />
        ) : (
          <a
            href="#"
            className=" btn btn-success mt-3"
            onClick={() => filePickerRef.current.click()}
          >
            Upload
          </a>
        )}
        <br />
        <button className="btn btn-primary" form={"addproduct"}>
          {loader ? "Uploading..." : "Added"}
        </button>
      </form>
    </div>
  );
}

export default BannerAdd;
