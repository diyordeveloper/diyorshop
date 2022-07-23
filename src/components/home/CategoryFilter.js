import { Slider } from "@mui/material";
import React from "react";
import { useUserContext } from "../../Context";

function valuetext(priceFilter) {
  return `${priceFilter}°C`;
}

function CategoryFilter() {
  const {
    CategoryFilters,
    returntoAllProducts,
    categories,
    active,
    setPriceFilter,
    priceFilter,
    min,
    max,
    products
  } = useUserContext();

  return (
    <div className="col-3 mt-3">
      <div className="card p-3">
        <h3>Category</h3>
        {/* <div>{priceFilter[0]}</div> */}
        {/* <div>{priceFilter[1]}</div> */}
        <input
          type="range"
          min={min}
          max={max}
          onChange={(e) => setPriceFilter(e.target.value)}
          value={priceFilter}
        />
        <button className="btn btn-danger mt-2" onClick={returntoAllProducts}>
          All {products.length} Products
        </button>
        {categories.map((itm, idx) => (
          <button
            key={idx}
            id={itm.id}
            onClick={() => CategoryFilters(itm)}
            className={`${
              itm.id === active
                ? " mt-2 btn btn-primary"
                : "mt-2 btn btn-outline-primary"
            }`}
          >
            {itm.category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
