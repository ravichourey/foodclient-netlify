import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ name, price, description, id, imageUrl }) => {
  const { increaseQty, decreaseQty, quantity } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="app-card food-card h-100 text-decoration-none">
        <div className="food-img-wrapper">
          <Link to={`/food/${id}`} tabIndex={-1}></Link>
          <img src={imageUrl} alt={name} className="food-img" />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-egg-fried text-warning"></i> {name}
          </h5>
          <p className="card-text text-secondary small flex-grow-1">
            {description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-1 mb-1 ">
            <span className="h5 mb-0 text-success d-flex align-items-center gap-1">
              <i className="bi bi-currency-rupee"></i>
              {price}
            </span>
            <span>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted ms-1">(4.5)</small>
            </span>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border-0">
          <Link
            className="btn btn-primary btn-sm d-flex align-items-center gap-1"
            to={`/food/${id}`}
          >
            <i className="bi bi-eye"></i> View
          </Link>
          {quantity[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => decreaseQty(id)}
              >
                <i className="bi bi-dash-circle"></i>
              </button>
              <span className="fw-bold">{quantity[id]}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => increaseQty(id)}
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm text-white d-flex align-items-center gap-1 app-btn-gradient"
              onClick={() => increaseQty(id)}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
