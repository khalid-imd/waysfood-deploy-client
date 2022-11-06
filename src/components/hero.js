import React from "react";
import "./hero.css";
import Pizza from "../images/landing/pizzaimage.png";

const Hero = () => {
  return (
    <div className="hero p-5 row d-flex align-items-center">
      <div className="col-10 offset-1">
        <div className="row d-flex align-items-center">
          <div className="col-lg-7 order-lg-1 order-2">
            <div className="">
              <p className="title">Are You Hungry ?</p>
              <p className="title">Express Home Delivery</p>
            </div>

            <div className="row">
              <div className="col-lg-5">
                <div className="me-3">
                  <hr className="line w-100" />
                </div>
              </div>
              <div className="col-lg-7">
                <div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-2 order-1">
            <img width="100%" src={Pizza} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
