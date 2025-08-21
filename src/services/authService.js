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

// Register new counselor → send to /Counselors, not /auth/register
export const registerCounselor = async (data) => {
  try {
    const response = await API.post("/Counselors", {
      title: data.title,
      fullName: data.fullName,
      gender: data.gender,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      profileName: data.profileName,  // short name or nickname
      description: data.description,
      imageUrl: data.imageUrl,        // Cloudinary URL
    });
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
