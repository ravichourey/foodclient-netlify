import axios from "axios";

const API_URL = "https://foodrestapii-production.up.railway.app//api/cart";

export const addToCart = async (foodId, token) => {
  try {
    await axios.post(
      `${API_URL}/cart`,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const removeItemFromCart = async (foodId, token) => {
  try {
    axios.post(
      `${API_URL}/remove`,
      { foodId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const getCartData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
};
