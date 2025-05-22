import axios from "axios";
const API_URL = "http://localhost:8080/api/food";

export const fetchFoodList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-foods`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
   
    return [];
  }
};

export const fetchFoodDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-food/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food details:", error);
    throw error;
  }
};