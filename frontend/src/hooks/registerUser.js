import axios from "axios";
const baseURL = "http://localhost:9090";
//TODO const


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      alert("Registration Successful! Check your email");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};