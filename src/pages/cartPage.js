import React, { useEffect } from "react";
import "./cartPage.css";
import Form from "react-bootstrap/Form";
import MapIcon from "../images/cartpage/mapicon.png";
import bin from "../images/cartpage/bin.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import map4 from "../images/cartpage/mapspopup4.png";
import map1 from "../images/cartpage/mapspopup1.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import toRupiah from "@develoka/angka-rupiah-js";

const CartPage = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  const params = useParams().id;
  const [state] = useContext(UserContext);
  const [cart, setCart] = useState();
  const getData = async () => {
    try {
      const response = await API.get("/transactions");
      setCart(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (state.user) getData();
  }, [state]);

  let { data: transaction } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data);
    return response.data.data;
  });

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  });

  const HandleAdd = async (qty, id) => {
    try {
      await API.patch(`/transaction/${id}`, { qty: qty });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleLess = async (qty, id) => {
    try {
      if (qty === 0) {
        deleteById.mutate(id);
      } else {
        await API.patch(`/transaction/${id}`, { qty: qty });
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filter = cart?.filter((p) => p.user_id == state?.user.id);
  const sum = cart
    ?.map((p) => p.product.price * p.qty)
    .reduce((a, b) => (a += b), 0);
  const qty = cart?.map((p) => p.qty).reduce((a, b) => (a += b), 0);
  const ongkir = 15000;

  return (
    <div className="w-75 mx-auto mt-5 row">
      {filter?.length ? (
        <div>
          <p className="mb-5 title col-12">Geprek Bensu</p>

          <div className="col-12">
            <label htmlFor="" className="sub col-lg-12 order-lg-1 order-1">
              Delivery Location
            </label>
            <div className="row mt-2">
              <div className="col-lg-9 order-lg-1 order-1">
                <Form.Control
                  className="mb-3 me-3 col-9"
                  type="text"
                  placeholder="Location"
                />
              </div>
              <div className="col-lg-3 order-lg-1 order-2">
                <>
                  <Button
                    style={{ width: "100%" }}
                    className="mb-3 button rounded"
                    onClick={handleShowLocation}
                  >
                    Select On Map <img src={MapIcon} alt="maps" />
                  </Button>
                  <Modal
                    show={showLocation}
                    onHide={handleCloseLocation}
                    backdrop="static"
                    keyboard={false}
                    size="xl"
                  >
                    <Modal.Body>
                      <img className="w-100" src={map1} alt="" />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseLocation}>
                        Confirm Location
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </div>
            </div>
          </div>
          <div className="row">
            <label htmlFor="" className="sub pb-3">
              Review Your Order
            </label>
            <div className="col-lg-8 order-lg-1 order-1">
              {transaction?.map(
                (item) =>
                  item.user_id == state?.user.id && (
                    <div className=" ">
                      <div className="row mb-3 border-bottom border-dark me-4 pt-3">
                        <div className="col-lg-4 col-sm-12 order-lg-1 order-1">
                          <img
                            src={`http://localhost:5000/uploads/${item?.product.image}`}
                            style={{ width: "100%" }}
                            alt=""
                            className="mb-2"
                          />
                        </div>
                        <div className="col-lg-8 col-sm-12 order-lg-1 order-2">
                          <div className="d-flex justify-content-between">
                            <p className="menu-name">{item?.product.title}</p>
                            <p className="price">
                              {toRupiah(item.product.price * item.qty, {
                                dot: ".",
                                floatingPoint: 0,
                              })}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-light "
                              onClick={() =>
                                HandleLess(
                                  Math.max(0, (item.qty -= 1)),
                                  item.id
                                )
                              }
                            >
                              -
                            </button>
                            <p>{item.qty}</p>
                            <button
                              className="btn btn-light"
                              onClick={() =>
                                HandleAdd((item.qty += 1), item.id)
                              }
                            >
                              +
                            </button>
                            <div>
                              <img src={bin} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="col-lg-4 order-lg-1 order-2">
              <div className="row mb-3 border-bottom border-top border-dark">
                <div className="d-flex justify-content-between"></div>
                <div className="d-flex justify-content-between">
                  <p>Sub Total</p>
                  <p className="price">
                    {toRupiah(sum, {
                      dot: ".",
                      floatingPoint: 0,
                    })}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Qty</p>
                  <p className="">{qty}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>ongkir</p>
                  <p className="price ">
                    {toRupiah(ongkir, {
                      dot: ".",
                      floatingPoint: 0,
                    })}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p className="price ">
                  {toRupiah(sum + ongkir, {
                    dot: ".",
                    floatingPoint: 0,
                  })}
                </p>
              </div>
              <div className="col-5 offset-7 mb-5">
                <>
                  <Button
                    style={{ width: "100%" }}
                    className="mb-3 button rounded mt-3 p-1"
                    onClick={handleShowOrder}
                  >
                    Order
                  </Button>
                  <Modal
                    show={showOrder}
                    onHide={handleCloseOrder}
                    keyboard={false}
                    size="xl"
                  >
                    <Modal.Body>
                      <img className="w-100" src={map4} alt="" />
                    </Modal.Body>
                  </Modal>
                </>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartPage;
