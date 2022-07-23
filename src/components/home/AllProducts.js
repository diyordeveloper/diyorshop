import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../Context";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function AllProducts({ itm, idx }) {
  const {AddBasketBtn} = useUserContext()

  return (
    <>
      <div key={idx} className="col-4">
        <div className="card card_ mt-4 p-3">
          <div className="images">
            <Link to={`/${itm.id}`}>
              <img src={itm.url} alt={"Error"} />
            </Link>
          </div>
          <h4 className="mt-2">{itm.title}</h4>
          <p className="">{itm.description.substr(0, 25)}... </p>
          <h5>{itm.price} - $</h5>
          <button
            onClick={() => AddBasketBtn(itm)}
            className="btn btn-dark mt-4"
          >
            <AddShoppingCartIcon /> Added{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
