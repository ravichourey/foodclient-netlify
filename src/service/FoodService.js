import axios from "axios";
const API_URL = "https://foodrestapii-production.up.railway.app/api/food";

export const fetchFoodList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-foods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
    throw error; // Throw error to handle it in the component
  }
};

export const fetchFoodDetails = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-food/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching food details:", error);
    throw error;
  }
};
