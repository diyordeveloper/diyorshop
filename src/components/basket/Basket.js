import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useUserContext } from "../../Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavFot from "../navfot/NavFot";
import "./basket.scss";
import BasketCard from "./BasketCard";
import { toast } from "react-toastify";
function Basket({}) {
  const { basket, totalQty, totalPrice, user } = useUserContext();
  const [modalToggle, setModalToggle] = useState(false);
  function Toggle() {
    setModalToggle(!modalToggle);
    console.log("open modal");
  }
  function onSubmitForm(e){
    e.preventDefault()
    const name = e.target[0].value
    const phone = e.target[1].value
    const region = e.target[2].value
    const district = e.target[3].value
    const target = e.target[4].value
    const house = e.target[5].value
    const explanation = e.target[6].value
    if(
      name !== '',
      phone !== '',
      region !== '',
      district !== '',
      target !== '',
      house !== '',
      explanation !== ''){
        console.log('successfuly bratan');
        toast.success("buyurtmangiz tez orada yetkazib beriladi")
        Toggle()
      }
      else{
        toast.error("Fill in the field")
      }
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
      <Modal isOpen={modalToggle} toggle={Toggle}>
        <ModalHeader>
          <h5 className="text-center">
            Quantity: <span className="text-primary">{totalQty}</span>
          </h5>
          <h5 className="text-center">
            Price: $ - <span className="text-primary">{totalPrice} </span>
          </h5>
        </ModalHeader>
        <ModalBody>
          <form id="shop" onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="First Name and Last Name"
              defaultValue={user?.name}
              className="form-control"
            />
            <input
              type="number"
              placeholder="Phone"
              defaultValue={user?.phone}
              className="form-control mt-2"
            />
            <input type="text" placeholder="Region" className="form-control mt-2" />
            <input type="text" placeholder="District" className="form-control mt-2" />
            <input type="text" placeholder="Target" className="form-control mt-2" />
            <input type="text" placeholder="Street name and house number" className="form-control mt-2" />
            <textarea className="form-control mt-2" placeholder="Explanation" ></textarea>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger w-100" onClick={Toggle}>Cancel</button>
          <button form="shop" className="btn btn-success w-100">Placing an order $ - {totalPrice}</button>
        </ModalFooter>
      </Modal>
    </NavFot>
  );
}

export default Basket;
