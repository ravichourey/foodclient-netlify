import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { quantity, token, setToken } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = Object.values(quantity).reduce((acc, qty) => acc + qty, 0);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <header>
      <nav className={`${styles.navbar}`}>
        <div className="container">
          <div className={styles["navbar-content"]}>
            {/* Left side - Brand */}
            <Link className={styles["navbar-brand"]} to="/">
              <i className="bi bi-egg-fried"></i>
              Foodies
            </Link>

            {/* Mobile menu button */}
            <button
              className={`${styles["menu-toggle"]} ${isMenuOpen ? styles.active : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Right side - Navigation */}
            <div className={`${styles["navbar-collapse"]} ${isMenuOpen ? styles.show : ""}`}>
              <ul className={styles["navbar-nav"]}>
                <li>
                  <NavLink
                    className={`${styles["nav-link"]} ${isActive("/") ? styles.active : ""}`}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles["nav-link"]} ${isActive("/explore") ? styles.active : ""}`}
                    to="/explore"
                  >
                    Explore
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles["nav-link"]} ${isActive("/about") ? styles.active : ""}`}
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles["nav-link"]} ${isActive("/cart") ? styles.active : ""}`}
                    to="/cart"
                  >
                    Cart
                    {totalItems > 0 && (
                      <span className={styles.badge}>
                        {totalItems}
                      </span>
                    )}
                  </NavLink>
                </li>
                
                {/* User Menu */}
                {token ? (
                  <li className={styles.dropdown}>
                    <button className={styles["dropdown-toggle"]}>
                      <i className="bi bi-person-circle"></i>
                    </button>
                    <div className={styles["dropdown-menu"]}>
                      <Link to="/profile" className={styles["dropdown-item"]}>
                        <i className="bi bi-person"></i> Profile
                      </Link>
                      <Link to="/settings" className={styles["dropdown-item"]}>
                        <i className="bi bi-gear"></i> Settings
                      </Link>
                      <Link to="/myorders" className={styles["dropdown-item"]}>
                        <i className="bi bi-bag"></i> My Orders
                      </Link>
                      <button onClick={handleLogout} className={styles["dropdown-item"]}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link to="/login" className={styles["nav-link"]}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
