import React, { useEffect, useState } from "react";
import { useAuth } from "../../../firebase.config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useUserContext } from "../../../Context";
import "./navbar.scss";
function Navbar() {
  const currentUser = useAuth();
  const { basketLen, setSearch,search } = useUserContext();
  // SearchFiler
  function Clear(){ 
      setSearch('') 
  }
  return (
    <div>
      <div className="">
        <nav className=" container      navbar border-bottom  navbar-light bg-light justify-content-between">
          <Link to="/" className="navbar-brand">
            <h2>DiyorShop</h2>
          </Link>
          <div className=" w-50  d-flex ">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="form-control "
              placeholder="Search..."
            />
            <button onClick={Clear} className="btn btn-secondary">clear</button>
          </div>

          {currentUser ? (
            <div className="d-flex align-items-center">
              <div className="navcard">
                <Link to="/basket">
                  <IconButton className="iconbutton">
                    <ShoppingCartIcon className="icon_" />
                    <div className={`lendiv ${basketLen !== 0 ? "anim" :null}`}>
                      <span className="len">{basketLen}</span>
                    </div>
                  </IconButton>
                </Link>
              </div>
              <Link to={"/profil"}>
                <div className="avatar">
                  <img
                    src={
                      currentUser.photoURL ||
                      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt="Error!"
                  />{" "}
                </div>
              </Link>
            </div>
          ) : (
            <div className="">
              <Link
                to={"/login"}
                className="btn btn-primary "
                style={{ marginRight: "15px" }}
              >
                Login
              </Link>
              <Link to={"/register"} className="btn btn-success">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
