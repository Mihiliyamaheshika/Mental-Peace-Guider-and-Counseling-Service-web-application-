import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await login({ email, password });
      const token = res.token;
      const user = res.user;

      if (!token || !user) {
        Swal.fire("Login Failed", "Invalid email or password", "error");
        return;
      }

      const decoded = decodeToken(token);
const finalUser = {
  ...user,
  role: (user.role || decoded?.role)?.toLowerCase(), // ✅ convert role to lowercase
  FullName: user.FullName || decoded?.FullName,
};


      localStorage.setItem("token", token);
      setUser(finalUser);

      await Swal.fire({
        title: "Login Successful!",
        text: "Redirecting...",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      if (finalUser.role === "counselor") {
  navigate("/counselor/booked", { replace: true });
} else if (finalUser.role === "user") {
  navigate("/dashboard", { replace: true });
} else {
  navigate("/", { replace: true });
}

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      Swal.fire({
        title: "Login Failed!",
        text:
          error.response?.data?.message ||
          "Unable to connect to server or invalid credentials",
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
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome!
        </h2>
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
