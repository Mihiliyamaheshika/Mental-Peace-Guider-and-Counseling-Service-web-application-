import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Firebase config import
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Import styles

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // ✅ Success Alert
      Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard"); // Redirect after closing alert
      });

    } catch (error) {
      // ❌ Error Alert
      Swal.fire({
        title: "Login Failed!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center w-screen" style={{ backgroundImage: "url('/3.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome!</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700 transition">Log in</button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button onClick={() => navigate("/roleselection")} className="text-blue-500 hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
