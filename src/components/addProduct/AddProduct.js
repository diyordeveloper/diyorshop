import React, { useState, useRef } from "react";
import { storage, db } from "../../firebase.config";
import { v4 } from "uuid";
import { useUserContext } from "../../Context";
import { toast } from "react-toastify";
export default function AddProducts() {
  const { categories } = useUserContext();

  const filePickerRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const ImageSelect = (e) => {
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
  };

  const AddSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const title = e.target[0].value;
    const description = e.target[1].value;
    const price = e.target[2].value;
    const category = e.target[3].value;
    if (
      (title !== "",
      description !== "",
      price !== "",
      category !== "",
      image !== null)
    ) {
      const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
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
            .ref("product-images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("products")
                .add({
                  id: v4(),
                  title,
                  description,
                  category,
                  price: Number(price),
                  url,
                })
                .then(() => {})
                .catch((error) => console.log(error.message));
            });
        }
      );
    }else{
      toast.error("Fill in the field")
  }
  setLoader(false);
  setImage(null)
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  };

  return (
    <div className="row mt-5">
      <div className="col-6 offset-3">
        <form id={"addproduct"} onSubmit={AddSubmit}>
          <input type="text" placeholder="title" className="form-control" />
          <input
            type="text"
            placeholder="description"
            className="form-control"
          />
          <input type="number" placeholder="price" className="form-control" />
          <select className="form-control">
            {categories.map((cate, indx) => (
              <>
                <option key={indx} value={cate.category}>{cate.category}</option>
              </>
            ))}
          </select>
          <input
            type="file"
            hidden
            ref={filePickerRef}
            onChange={ImageSelect}
          />

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
    </div>
  );
}
