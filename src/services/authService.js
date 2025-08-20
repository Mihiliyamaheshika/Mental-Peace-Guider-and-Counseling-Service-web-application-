import API from "./API"; // Axios instance

// Register new user
export const register = async (data) => {
  try {
    const response = await API.post("/auth/register", data); // Axios will prepend baseURL
    return response.data; // return only data
  } catch (error) {
    console.error("API register error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Register new counselor
export const registerCounselor = async (data) => {
  try {
    // Ensure role is "Counselor"
    data.role = "Counselor";
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("API registerCounselor error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("API login error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Get users by role (admin functionality)
export const getUsersByRole = async (role) => {
  try {
    const response = await API.get(`/auth/users/byrole/${role}`);
    return response.data;
  } catch (error) {
    console.error("API getUsersByRole error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
