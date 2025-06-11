import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ name, price, description, id, imageUrl }) => {
  const { increaseQty, decreaseQty, quantity } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="food-card">
        <div className="food-img-wrapper">
          <img src={imageUrl} alt={name} className="food-img" />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-egg-fried"></i>
            {name}
          </h5>
          <p className="card-text">{description}</p>
          <div className="price-rating">
            <span className="price">
              <i className="bi bi-currency-rupee"></i>
              {price}
            </span>
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <small>(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link to={`/food/${id}`} className="btn-view">
            <i className="bi bi-eye"></i>
            View
          </Link>
          {quantity[id] > 0 ? (
            <div className="quantity-controls">
              <button
                className="btn-quantity btn-decrease"
                onClick={() => decreaseQty(id)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="quantity-number">{quantity[id]}</span>
              <button
                className="btn-quantity btn-increase"
                onClick={() => increaseQty(id)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn-add-cart"
              onClick={() => increaseQty(id)}
              aria-label="Add to cart"
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
