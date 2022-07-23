import React from "react";
import NavFot from "../navfot/NavFot";
import { Link, useParams } from "react-router-dom"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import Moment from "react-moment";
import { useUserContext } from "../../Context";
function Card() {
  const { id } = useParams(); 
  const {products,AddBasketBtn} = useUserContext()

  return (
    <NavFot>
      <Link to="/">
        <IconButton>
          <ArrowBackIcon /> Back
        </IconButton>
      </Link>
      {products
        .filter((f) => f.id === id)
        .map((itm, idx) => (
          <div key={idx} className="col-12 product_">
            <div className="card p-4">
              <img src={itm.url} alt="Error" />
            </div>
            <div className="card p-4">
              <h2>Title: {itm.title}</h2>
              <h5 className="mt-3">Description: {itm.description}</h5>
              <h5 className="mt-3">Price: {itm.price} - $</h5>
              <h5 className="mt-3">Category: {itm.category}</h5>
              <h5 className="mt-3">
                {/* Time: <Moment fromNow>{itm.timestamp?.toDate()}</Moment> */}
              </h5>
              <button onClick={()=>AddBasketBtn(itm)} className="btn btn-dark mt-4">
                <AddShoppingCartIcon /> Added{" "}
              </button>
            </div>
          </div>
        ))}
    </NavFot>
  );
}

export default Card;
