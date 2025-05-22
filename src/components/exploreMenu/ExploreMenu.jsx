import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setSelectedCategory }) => {
  const menuBar = useRef(null);

  const scrollMenu = (offset) => {
    if (menuBar.current)
      menuBar.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="app-section">
      <div className="app-card explore-menu-card">
        <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
          <h2 className="mb-0 fs-4 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-grid-3x3-gap"></i>Explore Our Menu
          </h2>
          <div>
            <button
              className="btn btn-link p-0 me-2 scroll-icon"
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollMenu(-200)}
            >
              <i className="bi bi-arrow-left-circle fs-3"></i>
            </button>
            <button
              className="btn btn-link p-0 scroll-icon"
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollMenu(200)}
            >
              <i className="bi bi-arrow-right-circle fs-3"></i>
            </button>
          </div>
        </div>
        <p className="mb-3 text-secondary">
          Explore curated lists of dishes from top categories
        </p>
        <nav
          className="d-flex gap-4 overflow-auto pb-2 explore-menu-list"
          ref={menuBar}
          aria-label="Food categories"
        >
          {categories.map((item, idx) => (
            <article
              key={idx}
              className="text-center flex-shrink-0 explore-menu-list-item"
              style={{ width: 112, cursor: "pointer" }}
              onClick={() => setSelectedCategory(item.category)}
              tabIndex={0}
              aria-label={item.category}
            >
              <div
                className={`mx-auto bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm transition border
                  ${
                    item.category === category
                      ? "active-category"
                      : "inactive-category"
                  }`}
                style={{
                  width: 96,
                  height: 96,
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <img
                  src={item.icon}
                  alt={item.category}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.07)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <span
                className={`mt-2 fw-semibold small d-block ${
                  item.category === category ? "text-primary" : "text-secondary"
                }`}
                style={{ letterSpacing: "0.5px" }}
              >
                {item.category}
              </span>
            </article>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ExploreMenu;
