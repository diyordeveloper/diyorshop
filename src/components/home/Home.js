import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context";
import NavFot from "../navfot/NavFot";
import { Link } from "react-router-dom";
import CarouselHome from "./homeCarousel/CarouselHome";
import AllProducts from "./AllProducts";
import "./home.scss";
import FilterProduct from "./homeCarousel/FilterProduct";
import CategoryFilter from "./CategoryFilter";
import Loading from "../Loading/Loading";
function Home() {
  const { products , filteredProducts, category, search } = useUserContext();
  return (
    <>
      {  products.length  === 0  ? (
        <Loading />
      ) : (
        <div className="row">
          <NavFot>
            <CarouselHome />
            <div className="col-12">
              <div className="row justify-content-between mt-4">
                <CategoryFilter />
                {filteredProducts.length > 0 && (
                  <div className="col-9">
                    <h2 className="text-center">{category}</h2>

                    <div className="row">
                      {filteredProducts
                        .filter(
                          (f) =>
                            f.title
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            f.category
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((itm, idx) => (
                          <FilterProduct itm={itm} idx={idx} />
                        ))}
                    </div>
                  </div>
                )}
                {filteredProducts.length < 1 && (
                  <>
                    {products.length > 0 && (
                      <div className="col-9">
                        <h2 className="text-center">All Products</h2>
                        <div className="row">
                          {products
                            .filter(
                              (f) =>
                                f.title
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                f.category
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                            )
                            .map((itm, idx) => (
                              <AllProducts itm={itm} idx={idx} />
                            ))}
                        </div>
                      </div>
                    )}
                    {products.length < 1 && (
                      <h1 className="text-center">Please wait...</h1>
                    )}
                  </>
                )}
              </div>
            </div>
          </NavFot>
        </div>
      )}
    </>
  );
}

export default Home;
