import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center w-screen"
      style={{ backgroundImage: "url('/3.jpg')" }} // ✅ Keeping the background image
    >
      {/* Navigation Bar */}
      <header className="w-screen flex justify-between items-center h-12 bg-white shadow-md px-0">
        <nav className="text-gray-800 text-lg font-semibold"></nav>
        <img src="/logo.png" alt="MindPeace Logo" className="h-20 mr-10" />
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <h2 className="text-3xl font-bold text-white shadow-md bg-opacity-50 p-2 rounded">
          Your Mental Peace Journey Begins Here!
        </h2>
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome!
        </h2>

        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700 transition">
            Log in
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-screen bg-white text-sm text-gray-600 mt-10 py-4 shadow-md px-0 flex justify-between items-center">
        <p className="font-semibold text-gray-800 ml-8">
          Copyright © 2025 Mentalpeace.com. All rights reserved.
        </p>
        <div className="flex space-x-4 mr-8">
          <a href="#"><img src="/facebook-icon.png" className="h-6" alt="Facebook" /></a>
          <a href="#"><img src="/twitter-icon.png" className="h-6" alt="Twitter" /></a>
          <a href="#"><img src="/instagram-icon.jpg" className="h-6" alt="Instagram" /></a>
          <a href="#"><img src="/linkedin-icon.png" className="h-6" alt="LinkedIn" /></a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
