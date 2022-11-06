import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Navigation from "./components/navbar";
import AddProduct from "./pages/addProduct";
import CartPage from "./pages/cartPage";
import EditProfilePartner from "./pages/editProfilePartner";
import EditProfileuser from "./pages/editProfileUser";
import IncomeTransaction from "./pages/incomeTransaction";
import Landing from "./pages/landing";
import ProfilePartner from "./pages/profilePartner";
import ProfileUser from "./pages/profileUser";
import RestoMenu from "./pages/restoMenu";
import { useContext, useEffect, useState } from "react";

import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useContext(UserContext);

  // const PrivateRoute = ({ element: Component, ...rest }) => {
  //   const [state] = useContext(UserContext)

  //   return state.isLogin ? <Outlet /> : <Navigate to="/" />;
  // };

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await API.get("/check-auth");
      console.log(response);

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.code === 400) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Landing />} />

        <Route exact path="/profile-user" element={<ProfileUser />} />
        <Route exact path="/edit-profile-user" element={<EditProfileuser />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/menu/:id" element={<RestoMenu />} />

        <Route exact path="/profile-partner" element={<ProfilePartner />} />
        <Route
          exact
          path="/edit-profile-partner"
          element={<EditProfilePartner />}
        />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route
          exact
          path="/income-transaction"
          element={<IncomeTransaction />}
        />
      </Routes>
    </div>
  );
}

export default App;
