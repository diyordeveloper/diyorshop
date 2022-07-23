import React, { useEffect, useState, useRef } from "react";
// import { signOut, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, useAuth, storage } from "../../../firebase.config";
import UploadModal from "./UploadModal";
import "./profil.scss";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Context";

function Profil() {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [selectFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  async function logout() {
    await auth.signOut();
    navigate("/");
    console.log("Logout");
  }

  //   Storage
  // function UploadPhoto(e) {
  //   const reader = new FileReader();
  //   if (e.target.files[0]) {
  //     setPhoto(e.target.files[0]);
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  //   reader.onload = (readerEvent) => {
  //     setSelectedFile(readerEvent.target.result);
  //   };
  //   setToggle(!toggle);
  // }
  // async function UploadButton() {
  //   const fileRef = ref(storage, currentUser.uid + ".png");
  //   setLoader(true);
  //   const snapshot = await uploadBytes(fileRef, photo);
  //   const photoURL = await getDownloadURL(fileRef);
  //   updateProfile(currentUser, { photoURL });
  //   setLoader(false);
  //   setToggle(!toggle);
  //   toast.warning("Refresh the site");
  // }
  // useEffect(() => {
  //   if (currentUser?.photoURL) {
  //     setPhotoURL(currentUser.photoURL);
  //   }
  // }, [currentUser]);
  return (
    <div className="row mt-5 ">
      {/* <UploadModal
        toggle={toggle}
        setToggle={setToggle}
        setSelectedFile={setSelectedFile}
        selectFile={selectFile}
        loader={loader}
        setLoader={setLoader}
        UploadButton={UploadButton}
      /> */}
      <div className="col-6 offset-3">
        <div className="profil_">
          <Link to="/">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <h2 className="text-center">Profil</h2>
          <div className=" photos mt-3 ">
            <input
              type="file"
              hidden
              ref={filePickerRef}
              // onChange={UploadPhoto}
            />
            {/* <img src={photoURL} alt="Avatar" /> */}
          </div>
          <button
            className="update_photo mt-3"
            onClick={() => filePickerRef.current.click()}
          >
            <AddAPhotoIcon className="icon_" />
          </button>
          <div className="mt-3">
            <h3>
              <AccountCircleIcon /> : {user?.name}
            </h3>
            <h3>
              <EmailIcon /> : {user?.email}
            </h3>
            <h3>
              <EmailIcon /> : {user?.phone}
            </h3>
          </div>
          <button className="btn btn-danger mt-5" onClick={logout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profil;
