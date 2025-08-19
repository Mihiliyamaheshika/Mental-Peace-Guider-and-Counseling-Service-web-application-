import axios from "axios";

// Create axios instance
const API = axios.create({
 baseURL: "https://localhost:5001/api", // Your backend URL
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
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized → Token might be expired or invalid
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
