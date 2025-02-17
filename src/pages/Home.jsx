import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#B7D5E5] flex flex-col items-center justify-center w-screen">
      {/* Navigation Bar */}
      <header className="w-screen flex justify-between items-center h-12 bg-white shadow-md px-4">
        <nav className="text-gray-800 text-lg font-semibold flex items-center space-x-6">
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Resource Library
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/lifetips")}
                  >
                    Life Tips
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/love")}
                  >
                    Love
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/child")}
                  >
                    Child
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/career")}
                  >
                    Career
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/education")}
                  >
                    Education
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        <img src="/logo.png" alt="MindPeace Logo" className="h-20 mr-10" />
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Journey to Mental Peace Begins Here!</h2>
        <div className="flex justify-center w-full">
          <img
            src="/3.jpg"
            alt="Meditation"
            className="w-[500px] h-[300px] object-cover rounded-lg shadow-lg mt-6"
          />
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center w-64">
        <p className="font-semibold text-gray-700 text-lg">Get started...</p>
        <div className="mt-4">
          <button
            onClick={() => navigate("/login")}
            className="block w-full py-2 bg-gray-400 text-white rounded-lg my-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="block w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-screen bg-white text-sm text-gray-600 mt-10 py-4 shadow-md px-0 flex justify-between items-center">
        <p className="font-semibold text-gray-800 ml-8">Copyright © 2025 Mentalpeace.com. All rights reserved.</p>
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

export default Home;
