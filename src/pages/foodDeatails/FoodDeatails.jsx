import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFoodDetails } from "../../service/FoodService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDeatail.css";

const FoodDeatails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { increaseQty } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchFoodDetails(id);
        setData(res);
        toast.success("Food details loaded successfully");
      } catch (err) {
        toast.error("Error fetching food details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5">
        <i className="bi bi-arrow-repeat fs-1 spin"></i>
      </div>
    );

  const addTocart = () => {
    increaseQty(data.id);
    navigate("/cart", { state: { showToast: true } });
  };

  return (
    <main className="food-details-main">
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <article className="app-card food-details-card">
              <div className="card-body p-4 p-md-5">
                <div className="row g-4 align-items-center">
                  <div className="col-12 col-md-6">
                    <div className="food-details-img-wrapper">
                      <img
                        src={data.imageUrl}
                        alt={data.name}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <span className="badge bg-warning text-dark mb-2">
                      <i className="bi bi-tag"></i> {data.category}
                    </span>
                    <h2 className="fw-bold mb-2 d-flex align-items-center gap-2">
                      {data.name}
                      <i className="bi bi-emoji-heart-eyes text-danger"></i>
                    </h2>
                    <div className="mb-3 fs-4 fw-semibold text-success">
                      <i className="bi bi-currency-rupee"></i>
                      {data.price}
                    </div>
                    <p className="mb-4 text-secondary">{data.description}</p>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn app-btn-gradient text-white d-flex align-items-center gap-2"
                        onClick={addTocart}
                      >
                        <i className="bi bi-cart-plus"></i> Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger d-flex align-items-center gap-2 rounded-pill"
                        onClick={() => toast.info("Added to wishlist!")}
                      >
                        <i className="bi bi-heart"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-pill"
                        onClick={() => toast.info("Share feature coming soon!")}
                      >
                        <i className="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FoodDeatails;
