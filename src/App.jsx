import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { StoreContext } from "./context/StoreContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ExploreFood from "./pages/explore/ExploreFood";
import ContactUs from "./pages/contact us/ContactUs";
import FoodDeatails from "./pages/foodDeatails/FoodDeatails";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import MyOrders from "./pages/myorders/MyOrders";
import About from "./pages/about/About";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/error/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const { token } = useContext(StoreContext);

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/explore" element={<ExploreFood />} />
            <Route path="/food/:id" element={<FoodDeatails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
            <Route path="/login" element={token ? <Home /> : <Login />} />
            <Route path="/register" element={token ? <Home /> : <Register />} />
            <Route path="/myorders" element={token ? <MyOrders /> : <Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </ThemeProvider>
  );
};

export default App;
