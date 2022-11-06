import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./editProfileUser.css";
import MapIcon from "../images/profileuser/mapicon.png";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import map3 from "../images/profileuser/mapspopup3.png";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useContext } from "react";
import { useEffect } from "react";

const EditProfileuser = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({});

  const [form, setForm] = useState({
    fullname: "",
    image: "",
    email: "",
    phone: "",
    location: "",
  });

  let { data: user } = useQuery("editProfileCache", async () => {
    const response = await API.get("/user/" + state.user.id);
    console.log("ini respnse", response);
    return response.data.data;
  });

  useEffect(() => {
    if (user) {
      setPreview(user.image);
      setForm({
        ...form,
        fullname: user.fullname,
        image: user.image,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      const response = await API.patch("/user/" + user.id, formData);
      console.log(response.data);

      navigate("/profile-user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-5 w-75 row">
      <h2 className="title col-12">Edit Profile</h2>

      <Form className="mt-5 row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-9 order-lg-1 order-1 pb-3 ">
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={form?.fullname}
            onChange={handleChange}
          />
        </div>
        <div class="col-lg-3 order-lg-1 order-2 pb-3">
          <input
            type="file"
            name="image"
            class="form-control"
            id="inputGroupFile01"
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-12 order-lg-2 order-3 pb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={form?.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-12 order-lg-3 order-4 pb-3">
          <Form.Control
            type="number"
            placeholder="Phone"
            name="phone"
            value={form?.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-9 order-lg-4 order-5">
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={form?.location}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-3 order-lg-4 order-6 rounded pb-3">
          <Button
            style={{ width: "100%" }}
            className="button"
            onClick={handleShow}
          >
            Select On Map <img src={MapIcon} alt="maps" />
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
          >
            <Modal.Body>
              <img className="w-100" src={map3} alt="" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Confirm Location
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-lg-4 offset-lg-8 order-lg-5 order-7">
          <Button style={{ width: "100%" }} type="submit" className="button ">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfileuser;
