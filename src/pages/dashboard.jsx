import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; //JWT user info from login

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user 
  const [userName, setUserName] = useState("");

  useEffect(() => {

    if (!user) {
      navigate("/login"); // not logged in
    } else if (user.role !== "user") {
      navigate("/"); // redirect other roles
    }

    if (user && user.FullName) {
      setUserName(user.FullName); // Use FullName from JWT
    } else {
      setUserName("User"); // Default if user info is missing
    }
  }, [user, navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/4.jpg')" }}
    >
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center text-gray-900 bg-white bg-opacity-50 px-4 py-2 rounded-lg">
        Hello {userName}!! How are you feeling today?
      </h1>

      {/* Buttons Section */}
      <div className="mt-6 w-full max-w-md p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
        <button
          onClick={() => navigate("/Appointments")}
          className="w-full bg-gray-500 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition"
        >
          Book a Session
        </button>

        <button
          onClick={() => navigate("/progresstracker")}
          className="w-full bg-gray-500 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition"
        >
          Mental Health Progress Tracker
        </button>

        <button
          onClick={() => navigate("/chatbot")}
          className="w-full bg-gray-500 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition"
        >
          Quick Guidance
        </button>

        <button
          onClick={() => navigate("/immediate")}
          className="w-full bg-black text-white py-2 rounded-md my-2 hover:bg-gray-800 transition"
        >
          Need Immediate Help
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-700 bg-white bg-opacity-50 px-4 py-2 rounded-lg">
        <p>Copyright © 2025 MentalPeace.com. All rights reserved.</p>
        <div className="flex justify-center space-x-3 mt-2">
          <a href="#" className="text-blue-600 text-xl">🌐</a>
          <a href="#" className="text-blue-500 text-xl">📘</a>
          <a href="#" className="text-pink-500 text-xl">📷</a>
          <a href="#" className="text-blue-700 text-xl">💼</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
