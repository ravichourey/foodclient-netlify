import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { calculateCartTotal } from "../../util/CartUtil";
import { toast } from "react-toastify";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { foodList, increaseQty, decreaseQty, quantity, removeFromCart } =
    useContext(StoreContext);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Added to cart");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Get all food items in cart (with qty > 0)
  const cartFoods = foodList.filter((food) => (quantity[food.id] || 0) > 0);

  const { totalPrice, shippingCost, tax, finalTotal } = calculateCartTotal(
    cartFoods,
    quantity
  );

  return (
    <section className="app-section py-5">
      <h1 className="fw-bold  mb-5 text-center d-flex align-items-center justify-content-center gap-2">
        <i className="bi bi-cart3"></i>Your Shopping Cart
      </h1>
      <div className="row justify-content-center">
        {cartFoods.length === 0 ? (
          <div className="col-12 text-center py-5">
            <i className="bi bi-cart-x fs-1  mb-3"></i>
            <h4 className="fw-semibold mb-3">Your cart is empty</h4>
            <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="col-lg-8 mb-4">
              <article className="app-card mb-4">
                <div className="card-body">
                  {cartFoods.map((food) => (
                    <React.Fragment key={food.id}>
                      <div className="row align-items-center mb-4">
                        <Link to="/explore" className="col-4 col-md-3">
                          <img
                            src={food.imageUrl}
                            alt={food.name}
                            className="img-fluid rounded-3 shadow-sm"
                            style={{
                              width: "100%",
                              height: "120px",
                              objectFit: "contain",
                              background: "#f8f9fa",
                            }}
                          />
                        </Link>
                        <Link
                          to={"/explore"}
                          className="col-8 col-md-5"
                          style={{ textDecoration: "none" }}
                        >
                          <h5 className="fw-bold text-black mb-1">{food.name}</h5>
                          <p className="text-muted mb-0 small">
                            <i className="bi bi-tag me-1"></i>
                            {food.category}
                          </p>
                        </Link>
                        <div className="col-6 col-md-2 mt-2 mt-md-0">
                          <div className="input-group input-group-sm">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => decreaseQty(food.id)}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              style={{ maxWidth: "60px" }}
                              type="text"
                              className="form-control text-center"
                              value={quantity[food.id] || 0}
                              readOnly
                              aria-label="Quantity"
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => increaseQty(food.id)}
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-6 col-md-2 text-end mt-2 mt-md-0">
                          <p className="fw-bold mb-1 text-success">
                            ₹{food.price * (quantity[food.id] || 0)}
                          </p>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              removeFromCart(food.id);
                              toast.info("Removed from cart");
                            }}
                            aria-label="Remove from cart"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
              </article>
              <div className="text-start mb-4">
                <Link
                  to="/"
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
              </div>
            </div>
            <aside className="col-lg-4">
              <article className="app-card">
                <div className="card-body">
                  <h5 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                    <i className="bi bi-receipt"></i>Order Summary
                  </h5>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span>₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total</strong>
                    <strong>₹{finalTotal.toFixed(2)}</strong>
                  </div>
                  <button
                    className="btn app-btn-gradient w-100 rounded-pill py-2"
                    disabled={totalPrice === 0}
                    onClick={() => {
                      toast.success("Proceeding to checkout!");
                      navigate("/order");
                    }}
                  >
                    <i className="bi bi-bag-check me-2"></i>Proceed to Checkout
                  </button>
                </div>
              </article>
            </aside>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
