import axios from "axios";

const baseURL = "http://localhost:8000";

export const savePen = async (penData) => {
  try {
    const response = await axios.post(`${baseURL}/api/users/addpen`, penData);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
