import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);
  const filterFoods = foodList.filter(
    (food) =>
      (category === "all" ||
        food.category.toLowerCase() === category.toLowerCase()) &&
      food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        {filterFoods.length > 0 ? (
          filterFoods.map((food, index) => (
            <FoodItem
              key={index}
              name={food.name}
              description={food.description}
              price={food.price}
              id={food.id}
              imageUrl={food.imageUrl}
            />
          ))
        ) : (
          <div>No food items found</div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
