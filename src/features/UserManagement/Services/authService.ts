import axios from "axios";

const BASE_URL = "https://developerschool-backend.onrender.com";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/urole/userlogin`, {
      email,
      password,
    });
    const result = response.data;
    console.log(response);
    return result;
  } catch (error) {
    console.error("Error occurred during login:", error);
    alert("An error occurred during login. Please try again later.");

    throw error;
  }
};
