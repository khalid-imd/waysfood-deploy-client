import React from "react";
import Table from "react-bootstrap/Table";
import iconcheck from "../images/profilepartner/iconcheck.png";
import iconx from "../images/profilepartner/iconx.png";
import "./incomeTransaction.css";

const IncomeTransaction = () => {
  return (
    <div className="mx-auto mt-5 w-75 row">
      <p className="title col-12">Income Transaction</p>
      <Table bordered className="col-12">
        <thead>
          <tr>
            <th className="d-flex justify-content-center">No</th>
            <th>Name</th>
            <th>Adress</th>
            <th>Product Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sugeng no pants</td>
            <td>Cileungsi</td>
            <td>Paket Geprek, Paket ke..</td>
            <td className="waiting"> Waiting Approve </td>
            <td>
              <div className="d-flex justify-content-center ">
                <button className="me-2 w-50 button red sm-order-1">
                  cancel
                </button>
                <button className="w-50 button green sm-order-2">
                  approve
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Haris Gams</td>
            <td>Serang</td>
            <td>Paket Geprek, Paket ke..</td>
            <td className="sucsess">Success</td>
            <td>
              <div className="d-flex justify-content-center">
                <img src={iconcheck} alt="check" />
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Aziz Union</td>
            <td>Bekasi</td>
            <td>Paket Geprek, Paket ke..</td>
            <td className="cancel">Cancel</td>
            <td>
              <div className="d-flex justify-content-center">
                <img src={iconx} alt="x" />
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Lae Tanjung Balai</td>
            <td>Tanjung balai</td>
            <td>Paket Geprek, Paket ke..</td>
            <td className="otw">On The Way</td>
            <td>
              <div className="d-flex justify-content-center">
                <img src={iconcheck} alt="check" />
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default IncomeTransaction;
