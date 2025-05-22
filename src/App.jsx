import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ExploreFood from "./pages/explore/ExploreFood";
import ContactUs from "./pages/contact us/ContactUs";
import FoodDeatails from "./pages/foodDeatails/FoodDeatails";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import MyOrders from "./pages/myorders/MyOrders";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  
  const { token } = useContext(StoreContext);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDeatails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={token ? <PlaceOrder />: <Login/>} />
        <Route path="/login" element={token ?<Home/> :  <Login /> } />
        <Route path="/register" element={token ? <Home/> :<Register />} />
         <Route path="/myorders" element={token ? <MyOrders /> : <Login/>} /> 
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
