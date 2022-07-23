import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { auth, db, storage } from "../../firebase.config";
function AddCategory() {

  const [loader, setLoader] = useState(false);
  async function CategorySubmit(e) {
    e.preventDefault();
    setLoader(true);
    const category = e.target[0].value;
    if(category !== ''){
        db.collection("category")
      .add({
        id: v4(),
        category, 
      })  
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
    }else{
        toast.error("Fill in the field")
    }
    setLoader(false);
    e.target[0].value = "";
  }

  return (
    <div className="col-6 offsett-3">
      <form onSubmit={CategorySubmit} id={"categoryid"}>
        <input
          type="text"
          className="form-control"
          placeholder="add category"
        />
        <button className="btn btn-success" form="categoryid">
          {loader ? "Upload" : "Added"}
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
