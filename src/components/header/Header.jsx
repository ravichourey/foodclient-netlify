import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section
      className="app-section"
      style={{
       
        margin: "2rem auto",
      }}
    >
      <div className="app-card ">
        <h1 className="display-5 fw-bold text-dark mb-3 d-flex flex-column flex-md-row  align-items-center gap-2">
          <i className="bi bi-egg-fried"></i>
          <span>Order your favorite food here</span>
        </h1>
        <p className="fs-5 text-secondary mb-4">
          Discover the best food & drinks in Bengaluru
        </p>
        <Link to="/explore" className="btn app-btn-gradient btn-lg px-4 py-2">
          <i className="bi bi-search me-2"></i>Explore
        </Link>
      </div>
    </section>
  );
};

export default Header;
