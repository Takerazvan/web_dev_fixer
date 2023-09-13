import axios from "axios";
const baseURL = "http://localhost:8080";
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
