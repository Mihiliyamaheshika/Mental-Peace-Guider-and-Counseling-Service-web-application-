import API from "./API"; // Axios instance

// Register new user
export const register = async (data) => {
  try {
    const response = await API.post("/Auth/register", data); // Axios will prepend baseURL
    return response.data; // return only data
  } catch (error) {
    console.error("API register error:", error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await API.post("/Auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("API login error:", error.response?.data || error.message);
    throw error;
  }
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const response = await API.get(`/Auth/users/byrole/${role}`);
    return response.data;
  } catch (error) {
    console.error("API getUsersByRole error:", error.response?.data || error.message);
    throw error;
  }
};
