import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import "./nearResto.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import { UserContext } from "../context/userContext";

const NearResto = () => {
  // Fetching product data from database
  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/user");
    const admin = response.data.data.filter((p) => p.role == "admin");
    return admin;
  });

  const params = useParams();
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="w-75 mx-auto mt-5 mb-5">
      <div className="d-flex justify-content-start">
        <h2 className="title-near">Restaurant Near You</h2>
      </div>
      <div className="d-md-flex mt-4 mb-3 flex-wrap gap-1 justify-content-between">
        {user?.map((item) => {
          return (
            // <Link className="link pb-3" to={`/menu/${params.id}`}>
            <Card
              style={{ width: "12rem" }}
              onClick={() => navigate(`/menu/${item.id}`)}
            >
              <Card.Img src={item.image} />
              <Card.Body>
                <Card.Title className="d-flex justify-content-start title-restaurant">
                  {item.fullname}
                </Card.Title>
                <Card.Text className="d-flex justify-content-start title-restaurant">
                  {" "}
                  {item.distance}
                </Card.Text>
              </Card.Body>
            </Card>
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NearResto;
