import React, { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./ExploreFood.css";

const categories = [
  { value: "", label: "Select Category", disabled: true },
  { value: "Biryani", label: "Biryani" },
  { value: "Cake", label: "Cake" },
  { value: "Pizza", label: "Pizza" },
  { value: "Burger", label: "Burger" },
  { value: "Dosa", label: "Dosa" },
  { value: "Ice Cream", label: "Ice Cream" },
  { value: "Noodles", label: "Noodles" },
  { value: "Pasta", label: "Pasta" },
  { value: "Salad", label: "Salad" },
  { value: "Tea", label: "Tea" },
  { value: "All", label: "All" },
];

const ExploreFood = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  return (
    <main className="explore-main">
      <section className="app-section">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="app-card explore-search-card mb-4 ">
                <div className="card-body bg">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group mb-1">
                      <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ maxWidth: "180px" }}
                      >
                        {categories.map((cat) => (
                          <option
                            key={cat.value}
                            value={cat.value}
                            disabled={cat.disabled}
                          >
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search your favorite dish..."
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                      />
                      <button
                        className="btn app-btn-gradient"
                        type="submit"
                        tabIndex={-1}
                      >
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* FoodDisplay renders the food cards below */}
          <FoodDisplay category={selectedCategory} searchText={searchText} />
        </div>
      </section>
    </main>
  );
};

export default ExploreFood;
