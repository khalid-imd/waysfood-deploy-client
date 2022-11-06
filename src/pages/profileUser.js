import React, { useContext, useEffect } from "react";
import userpicture from "../images/profileuser/userpicture.png";
import "./profileUser.css";
import icon from "../images/profileuser/icon.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Rp from "rupiah-format";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileUser = () => {
  const [state] = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user");
    const admin = response.data.data.filter((p) => p.id === state.user.id);
    return admin;
  });

  const [history, setHistory] = useState();
  const getData = async () => {
    try {
      const response = await API.get("/transactions");
      setHistory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let { data: transaction } = useQuery("historyCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data);
    return response.data.data;
  });

  useEffect(() => {
    if (state.user) getData();
  }, [state]);

  return (
    <div style={{ backgroundColor: "#EFEFEF", width: "100%" }}>
      <div className="mx-auto w-75 row">
        <div className="col-lg-6 order-lg-1 order-1">
          <p className="title mb-5 mt-5">My Profile</p>
          {user?.map((item) => {
            return (
              <div className="row">
                <div className="col-5">
                  <div>
                    <img width="100%" src={item?.image} alt="profile photo" />
                  </div>
                  <div>
                    <Link to="/edit-profile-user">
                      {" "}
                      <Button className="mt-2 w-100 button">
                        edit profile
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      Full Name
                    </label>
                    <p className="desc">{item.fullname}</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      Email
                    </label>
                    <p className="desc">{item.email}</p>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="" className="sub">
                      phone
                    </label>
                    <p className="desc">{item.phone}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-6 order-lg-2 order-2">
          <p className="title mb-5 mt-5">History Order</p>
          {transaction?.map(
            (item) =>
              item.user_id == state?.user.id && (
                <div className="row bg-history rounded p-2 mb-4">
                  <div className="col-8">
                    <label className="andi mb-1">{item.user.fullname}</label>
                    <br />
                    <label className="andi">{item.product.title}</label>
                    <p className="day">Saturday, 12 March 2021</p>
                    <p className="total">{Rp.convert(item.product.price)}</p>
                  </div>
                  <div className="col-4">
                    <div>
                      <img width="100%" src={icon} alt="" />
                    </div>
                    <div className="bg-finish text-middle text-center p-1 mt-3 rounded">
                      <p className="finished m-auto">{item.status}</p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
