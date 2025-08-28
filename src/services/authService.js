import API from "./API"; // Axios instance

// Register new user
export const register = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("API register error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const registerCounselor = async (data) => {
  try {
    const response = await API.post("/Counselors/signup", {
      Title: data.Title || data.title || "",
      FullName: data.FullName || data.fullName || "",
      Gender: data.Gender || data.gender || "",
      Email: data.Email || data.email || "",
      Password: data.Password || data.password || "",
      ProfileName: data.ProfileName || data.profileName || "",
      Description: data.Description || data.description || "",
      ImageUrl: data.ImageUrl || data.imageUrl || "",
      AvailabilityDays: data.AvailabilityDays || data.availabilityDays || ""
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
