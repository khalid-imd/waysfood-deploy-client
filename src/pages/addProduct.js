import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./addProduct.css";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddProduct = () => {
  let navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const { title, price, image } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log("tessst");

      const formData = new FormData();
      console.log(formData);
      formData.set("image", form.image[0], form.image[0]?.name);
      formData.set("title", form.title);
      formData.set("price", form.price);
      console.log(form.image[0].name);

      const data = await API.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      console.log(data);
      // navigate("");

      console.log("ini insert product", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-5 w-75 row">
      <h2 className="title col-12">Add Product</h2>

      <Form className="mt-5 row" onSubmit={handleSubmit}>
        <div className="col-lg-9 order-lg-1 order-1 pb-3">
          <Form.Control
            type="text"
            placeholder="Name Partner"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-3 order-lg-1 order-2 pb-3">
          <input
            type="file"
            name="image"
            // value={image}
            onChange={handleChange}
            class="form-control input-group-text w-100 rounded-end"
            id="inputGroupFile01"
            // hidden
          />
        </div>
        <div className="col-lg-12 order-lg-2 order-3 pb-3">
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="col-lg-3 offset-lg-9 order-lg-3 order-4 mb-5 text-decoration-none"
        >
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
