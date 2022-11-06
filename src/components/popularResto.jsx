import React from "react";
import { Popular } from "../components/dummy/popularRestaurant";
import "./popularResto.css";

const PopularResto = () => {
  return (
    <div className="w-75 mx-auto mt-5 ">
      <div className="d-flex justify-content-start">
        <h2 className="title-popular">Popular Restaurant</h2>
      </div>
      <div className="row">
        {Popular.map((item) => {
          return (
            <div className="col-lg-3 col-md-6 col-12 mb-lg-0 mb-3">
              <div className="d-flex align-items-center p-2 shadow-sm rounded">
                <img src={item.image} alt="" className="me-2" />
                <h3 className="justify-content-center title-restaurant text-align-center">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularResto;
