import React, { createContext, useState, useEffect } from "react";
import { fetchFoodList } from "../service/FoodService"; // or your data source
import axios from "axios";
import {
  addToCart,
  getCartData,
  removeItemFromCart,
} from "../service/CartService";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [token, setToken] = useState("");
  const refreshFoodList = async () => {
    const data = await fetchFoodList();
    setFoodList(data);
  };
  
  const loadCartData = async (token) => {
    const items = await getCartData(token);
    setQuantity(items);
  };
  const increaseQty = async (foodId) => {
    setQuantity((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };
  const decreaseQty = async (foodId) => {
    setQuantity((prev) => {
      const newQty = { ...prev };
      if (newQty[foodId] > 1) {
        newQty[foodId] -= 1;
      } else {
        delete newQty[foodId];
      }
      return newQty;
    });

    await removeItemFromCart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuantity((prev) => {
      const newQty = { ...prev };
      delete newQty[foodId];
      return newQty;
    });
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantity,
    removeFromCart,
    setToken,
    token,
    refreshFoodList,
    setQuantity,
    loadCartData,
  };

  useEffect(async () => {
    fetchFoodList().then((data) => setFoodList(data));
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCardData(localStorage.getItem("token"));
    }
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
