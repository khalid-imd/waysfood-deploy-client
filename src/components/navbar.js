import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import icon from "../images/navbar/icon.png";
import ProfilePartner from "../images/navbar/profilePartner.png";
import usericon from "../images/navbar/usericon.png";
import addproducticon from "../images/navbar/addicon.png";
import logouticon from "../images/navbar/logouticon.png";
import basket from "../images/navbar/basketshop.png";
import profile from "../images/navbar/userprofile.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";

const Navigation = () => {
  const [showlogin, setShowlogin] = useState(false);
  const [showregister, setShowregister] = useState(false);
  const handleCloseLogin = () => setShowlogin(false);
  const handleCloseRegister = () => setShowregister(false);
  const handleShowlogin = () => setShowlogin(true);
  const handleShowregister = () => setShowregister(true);

  let navigate = useNavigate();

  const title = "Register";
  document.title = "DumbMerch | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    role: "",
  });

  // const { name, email, password } = form;

  const { email, fullname, password, gender, phone, role } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log(form);

  // Create function for handle insert data process with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = (
        <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
      );

      setMessage(alert);

      console.log("ini response register", response);
    } catch (e) {
      console.log(e);
      const alert = <Alert variant="danger">Aduh gagal!</Alert>;

      setMessage(alert);
    }
  });

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (gusti) {
      console.log(gusti);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;
    }
  });

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="color">
      <Container>
        <Link to="/">
          <Navbar.Brand href="#home">
            <img src={icon} alt="wayfood" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {state.user.role === "admin" ? (
              <Navbar expand="lg" className="color">
                <Container>
                  <Navbar id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link></Nav.Link>
                      <Nav.Link eventKey={2}>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-basic"
                          >
                            <img
                              style={{ width: "30px" }}
                              src={ProfilePartner}
                              alt="profile"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">
                              <Link
                                className="text-decoration-none text-dark"
                                to="/profile-partner"
                              >
                                {" "}
                                <img width={25} src={usericon} alt="" /> Profile
                                Partner
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="1">
                              <Link
                                to="/add-product"
                                className="text-decoration-none text-dark"
                              >
                                <img width={25} src={addproducticon} alt="" />{" "}
                                Add Product
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="3" onClick={logout}>
                              {/* <Link
                                to="/"
                                className="text-decoration-none text-dark"
                              > */}
                              <img width={25} src={logouticon} alt="" /> Logout
                              {/* </Link> */}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Nav.Link>
                    </Nav>
                  </Navbar>
                </Container>
              </Navbar>
            ) : state.user.role === "user" ? (
              <Navbar collapseOnSelect expand="lg" className="color">
                <Container>
                  <Navbar>
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link>
                        <Link to="/cart">
                          <img
                            style={{ width: "25px" }}
                            className="mt-2"
                            src={basket}
                            alt="basket"
                          />{" "}
                          <Badge
                            className="rounded-circle"
                            bg="danger"
                            style={{ position: "absolute" }}
                          >
                            0
                          </Badge>
                        </Link>
                      </Nav.Link>
                      <Nav.Link eventKey={2}>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-basic"
                          >
                            <img
                              style={{ width: "30px" }}
                              src={profile}
                              alt="user"
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              {" "}
                              <Link
                                className="text-decoration-none text-black"
                                to="profile-user"
                              >
                                <img width={25} src={usericon} alt="" />
                                Profile
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>
                              <img width={25} src={logouticon} alt="" />
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Nav.Link>
                    </Nav>
                  </Navbar>
                </Container>
              </Navbar>
            ) : (
              <div className="d-flex">
                <Nav.Link>
                  <button
                    className="register-login"
                    onClick={handleShowregister}
                  >
                    Register
                  </button>
                  <>
                    <Modal
                      show={showregister}
                      onHide={handleCloseRegister}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="modal-title">
                          Register
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="email"
                              name="email"
                              value={email}
                              onChange={handleChange}
                              placeholder="Email"
                              autoFocus
                              className="bg-form"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              autoFocus
                              className="bg-form"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Full Name"
                              name="fullname"
                              value={fullname}
                              onChange={handleChange}
                              autoFocus
                              className="bg-form"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Gender"
                              name="gender"
                              value={gender}
                              onChange={handleChange}
                              autoFocus
                              className="bg-form"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="number"
                              placeholder="Phone Number"
                              name="phone"
                              value={phone}
                              onChange={handleChange}
                              autoFocus
                              className="bg-form"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <select
                              class="form-select bg-form"
                              aria-label="Default select example"
                              name="role"
                              value={role}
                              onChange={handleChange}
                            >
                              <option selected autoFocus className="text.form">
                                As Admin/User
                              </option>
                              <option value="admin">As Admin</option>
                              <option value="user">As User</option>
                            </select>
                          </Form.Group>
                          <Button
                            onClick={(e) => handleSubmit.mutate(e)}
                            className="w-100 bg-brown bold"
                          >
                            Register
                          </Button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="mx-auto">
                          <p>
                            Already have an account ? Klik{" "}
                            <strong
                              onClick={() => {
                                handleShowlogin();
                                handleCloseRegister();
                              }}
                            >
                              Here
                            </strong>
                          </p>
                        </div>
                      </Modal.Footer>
                    </Modal>
                  </>
                </Nav.Link>
                <Nav.Link eventKey={2}>
                  <button onClick={handleShowlogin} className="register-login">
                    Login
                  </button>
                  <>
                    <Modal
                      show={showlogin}
                      onHide={handleCloseLogin}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="modal-title">Login</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              autoFocus
                              value={email}
                              name="email"
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              placeholder="Password"
                              autoFocus
                            />
                          </Form.Group>

                          <Button
                            onClick={(e) => handleSubmitLogin.mutate(e)}
                            type="submit"
                            className="w-100 bg-brown bold"
                          >
                            Login
                          </Button>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="mx-auto">
                          <p>
                            Don't have an account ? Klik{" "}
                            <strong
                              onClick={() => {
                                handleShowregister();
                                handleCloseLogin();
                              }}
                            >
                              Here
                            </strong>
                          </p>
                        </div>
                      </Modal.Footer>
                    </Modal>
                  </>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
