import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { v4 } from "uuid";
import { useUserContext } from "../../Context";
import { db } from "../../firebase.config";

function Modalorders({ modalToggle, Toggle }) {
  const { totalQty, totalPrice, user } = useUserContext();
  const [loader, setLoader] = useState(false);

  function onSubmitForm(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const phone = e.target[1].value;
    const region = e.target[2].value;
    const district = e.target[3].value;
    const target = e.target[4].value;
    const house = e.target[5].value;
    const explanation = e.target[6].value;
    if (
      (name !== "",
      phone !== "",
      region !== "",
      district !== "",
      target !== "",
      house !== "",
      explanation !== "")
    ) {
      db.collection("others")
        .add({
          id: v4(),
          name,
          phone,
          region,
          district,
          target,
          house,
          explanation
        })
        .then((res) => {
          console.log(res);
          toast.success("Successfully Added");
          console.log("successfuly bratan");
          toast.success("buyurtmangiz tez orada yetkazib beriladi");
          e.target[0].value = "";
          e.target[1].value = "";
          e.target[2].value = "";
          e.target[3].value = "";
          e.target[4].value = "";
          e.target[5].value = "";
          e.target[6].value = "";
          setLoader(false);
          Toggle();
        })
        .catch((err) => console.log(err.message));
    } else {
      setLoader(false);
      toast.error("Fill in the field");
    }
  }
  return (
    <>
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
            <input
              type="text"
              placeholder="Region"
              className="form-control mt-2"
            />
            <input
              type="text"
              placeholder="District"
              className="form-control mt-2"
            />
            <input
              type="text"
              placeholder="Target"
              className="form-control mt-2"
            />
            <input
              type="text"
              placeholder="Street name and house number"
              className="form-control mt-2"
            />
            <textarea
              className="form-control mt-2"
              placeholder="Explanation"
            ></textarea>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger w-100" onClick={Toggle}>
            Cancel
          </button>
          <button form="shop" className="btn btn-success w-100">
            Placing an order $ - {totalPrice}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Modalorders;
