import axios from "axios";

// Base URL from environment variable or fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:5001";

// Create Axios instance
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Prepend /api for all requests
  headers: { "Content-Type": "application/json" },
});

// Automatically add JWT token to requests
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized → token might be expired or invalid
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login
      } else if (status === 403) {
        alert("You don't have permission to perform this action.");
      } else if (status === 500) {
        console.error("Server error:", error.response.data);
        alert("Something went wrong on the server. Please try again later.");
      }
    } else {
      console.error("Network error:", error);
      alert("Unable to connect to the server. Check your internet or backend.");
    }

    return Promise.reject(error);
  }
);

export default API;

// --- Auth / Registration helper functions ---

// Register normal user
export const registerUser = async ({ fullName, email, password, confirmPassword }) => {
  try {
    const response = await API.post("/auth/register", {
      fullName,
      email,
      password,
      confirmPassword,
      role: "User",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register counselor (with Cloudinary imageUrl)
export const registerCounselor = async ({
  title,
  fullName,
  gender,
  email,
  password,
  profileName,
  description,
  imageUrl,
}) => {
  try {
    const response = await API.post("/Counselors", {
      title,
      fullName,
      gender,
      email,
      password,
      profileName,
      description,
      imageUrl, // Cloudinary URL
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
