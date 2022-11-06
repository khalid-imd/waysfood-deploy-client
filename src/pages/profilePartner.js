import React, { useContext } from "react";
import partnerpicture from "../images/profilepartner/partnerpicture.png";
import "./profilePartner.css";
import icon from "../images/profilepartner/icon.png";
import { Link } from "react-router-dom";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePartner = () => {
  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user");
    const admin = response.data.data.filter((p) => p.id == state.user.id);
    return admin;
  });

  const [state] = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
      <div className="mx-auto w-75 row pt-5">
        <div className="col-lg-7 order-lg-1 order-1">
          <p className="title mb-5">Profile Partner</p>
          {user?.map((item) => {
            return (
              <div className="row">
                <div className="col-4">
                  <div>
                    <img width="100%" src={item?.image} alt="proile photo" />
                  </div>
                  <div>
                    <Link to="/edit-profile-partner">
                      {" "}
                      <button className="mt-2 w-100 button">
                        edit profile
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      Name Partner
                    </label>
                    <p className="desc">{item?.fullname}</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      Email
                    </label>
                    <p className="desc">{item?.email}</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      phone
                    </label>
                    <p className="desc">{item?.phone}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-lg-5 order-lg-2 order-2">
          <p className="title mb-5">History Order</p>
          <div className="row bg-history p-2 rounded">
            <div className="col-8">
              <label className="andi">Andi</label>
              <p className="day">Saturday, 12 March 2021</p>
              <p className="total">Total : Rp 45.000</p>
            </div>
            <div className="col-4">
              <div>
                <img width="100%" src={icon} alt="" />
              </div>
              <div className="bg-finish text-middle text-center p-1 mt-3 rounded">
                <p className="finished m-auto">Finished</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePartner;
