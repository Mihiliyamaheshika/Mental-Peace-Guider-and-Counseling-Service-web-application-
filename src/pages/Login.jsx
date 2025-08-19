import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Backend login API
import { AuthContext } from "../context/AuthContext"; // Context to store user
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const { setUser } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }); // backend returns { token, user }
      const token = res.token;
      const user = res.user;

      if (!token || !user) {
        Swal.fire("Login Failed", "Invalid email or password", "error");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Save user in context
      setUser(user);

      // ✅ Success alert
      await Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to dashboard...",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      Swal.fire({
        title: "Login Failed!",
        text: error.response?.data?.message || "Unable to connect to server or invalid credentials",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center w-screen"
      style={{ backgroundImage: "url('/3.jpg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome!</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/roleselection")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
