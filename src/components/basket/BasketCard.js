import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../Context";
import { auth, db } from "../../firebase.config";

function BasketCard({ itm, idx }) {
  const { IncreaseBasketBtn, DecreaseBasketBtn } = useUserContext();
  // Savatchada productni qiymatini kopaytirish

  let Product;
  function Qoshish() {
    Product = itm;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("basket " + user.uid)
          .doc(itm.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  }
  function Ayirish() {
    Product = itm;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;
      // updating in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("basket " + user.uid)
            .doc(itm.ID)
            .update(Product)
            .then(() => {
              console.log("decrement");
            });
        } else {
          console.log("user is not logged in to decrement");
        }
      });
    }
  }
  // Savatchadan o'chirish
  function Delete() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("basket " + user.uid)
          .doc(itm.ID)
          .delete()
          .then(() => {
            console.log("successfully deleted");
          toast.error("Removed from cart")
          })
          .catch((err) => console.log(err));
      }
    });
  }
  return (
    <>
      <div key={idx} className="col-3">
        <div className="card card_ mt-4 p-3">
          <div className="images">
            <Link to={`/${itm.id}`}>
              <img src={itm.url} alt={"Error"} />
            </Link>
          </div>
          <h4 className="mt-2">{itm.title}</h4>
          <p className="">{itm.description.substr(0, 25)}... </p>
          <h5>{itm.price} - $</h5>
          <div className="d-flex align-items-center mt-2 justify-content-between ">
            <button onClick={Qoshish} className="btn btn-primary">
              +
            </button>
            <strong>{itm.qty}</strong>
            <button onClick={Ayirish} className="btn btn-primary">
              -
            </button>
          </div>
          <h5 className="text-center">{itm.TotalProductPrice} - $</h5>
          <button onClick={Delete} className="btn btn-danger mt-2">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default BasketCard;
