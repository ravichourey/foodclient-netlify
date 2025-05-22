import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import styles from "./Navbar.module.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const { quantity, token , setToken} = useContext(StoreContext);
  const totalItems = Object.values(quantity).reduce((acc, qty) => acc + qty, 0);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg ${styles.navbar}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="container">
          <Link
            className={`navbar-brand fw-bold d-flex align-items-center gap-2 ${styles["navbar-brand"]}`}
            to="/"
          >
            <i className="bi bi-egg-fried fs-3"></i>
            Foodies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <NavLink
                  className={`nav-link fw-semibold ${styles["nav-link"]}`}
                  to="/"
                >
                  <i className="bi bi-house-door me-1"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link fw-semibold ${styles["nav-link"]}`}
                  to="/explore"
                >
                  <i className="bi bi-search me-1"></i>Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link fw-semibold ${styles["nav-link"]}`}
                  to="/contact-us"
                >
                  <i className="bi bi-person-lines-fill me-1"></i>Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link fw-semibold position-relative ${styles["nav-link"]}`}
                  to="/cart"
                >
                  <i className="bi bi-cart3 me-1"></i>Cart
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                      <span className="visually-hidden">cart items</span>
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2 ms-lg-4 mt-3 mt-lg-0">
              {!token ? (
                <>
                  {" "}
                  <button
                    className={`btn btn-gradient px-4 rounded-pill d-flex align-items-center gap-2 ${styles["btn-gradient"]}`}
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                      background:
                        "linear-gradient(90deg, #0d6efd 60%, #198754 100%)",
                      border: "none",
                      fontWeight: 600,
                      letterSpacing: "1px",
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>Login
                  </button>
                  <button
                    className={`btn btn-outline-primary px-4 rounded-pill fw-semibold ${styles["btn-outline-primary"]}`}
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="dropdown text-end">
                     <a href="" className="d-block link-body-emphasis
                  text-decoration-none
                  dropdown-toggle" data-bs-toggle="dropdown"
                  aria-expanded = "false">
                  <img
                    src={assets.profile}
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                  </a>
                  <ul className="dropdown-menu text-small"
                  style={{cursor: "pointer"}}>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/myorders")}
                    >
                      Orders
                    </li>

                    <li className="dropdown-item" onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
