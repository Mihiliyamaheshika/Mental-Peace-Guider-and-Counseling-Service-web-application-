import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Decode JWT manually
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser && decodedUser.role) {
        setUser(decodedUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
