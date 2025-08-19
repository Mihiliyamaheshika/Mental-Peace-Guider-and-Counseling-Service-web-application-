import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to decode JWT manually
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1]; // get the middle part of the token
      return JSON.parse(atob(payload)); // decode base64 and parse JSON
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) setUser(decodedUser);
      else localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
