import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavFot from "../navfot/NavFot";
import "./basket.scss";
import BasketCard from "./BasketCard";
import { toast } from "react-toastify";
import Modalorders from "./Modalorders";
function Basket({}) {
  const { basket, totalQty, totalPrice, user } = useUserContext();
  const [modalToggle, setModalToggle] = useState(false);
  function Toggle() {
    setModalToggle(!modalToggle);
    console.log("open modal");
  }
 
  return (
    <NavFot>
      <Link to="/">
        <IconButton>
          <ArrowBackIcon /> Back
        </IconButton>
      </Link>
      <div className="row mt-3">
        <h2>Basket</h2>
        {basket.length !== 0 ? (
          <>
            {basket.map((itm, idx) => (
              <>
                <BasketCard itm={itm} idx={idx} />
              </>
            ))}
            <hr className="mt-3" />
            <div className="col-6  offset-3 mt-4">
              <div className="card p-3">
                <h2 className="text-center text-primary ">Cart Summary</h2>
                <h4>Total No of Products: {totalQty}</h4>
                <h4>Total Price to Pay: $ - {totalPrice} </h4>
                <button className="btn btn-primary mt-3 " onClick={Toggle}>
                  Cash on Delivery
                </button>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-center">
            <Link to={"/"}>Return to home page</Link>
            <br />
            <img
              src="http://almureed.ae/assets/website/images/empty-cart.gif"
              className=" mt-3"
              alt=""
            />
          </h2>
        )}
      </div>
      <Modalorders modalToggle={modalToggle} Toggle={Toggle} />
    </NavFot>
  );
}

export default Basket;
