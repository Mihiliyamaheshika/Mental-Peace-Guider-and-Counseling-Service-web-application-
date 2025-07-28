import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Import Firebase Auth

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // ✅ State to store the user's name

  useEffect(() => {
    const auth = getAuth();
    
    // ✅ Listen for user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ Get user's display name from Firebase
        setUserName(user.displayName || "User"); // Default to "User" if no name is set
      }
    });
  }, []);

  return (
    
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/4.jpg')" }} // ✅ Set background image
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
          onClick={() => navigate("/progress-tracker")}
          className="w-full bg-gray-500 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition"
        >
          Mental Health Progress Tracker
        </button>

        <button
          onClick={() => navigate("/chatbot")}
          className="w-full bg-gray-500 text-white py-2 rounded-md my-2 hover:bg-blue-700 transition"
        >
          Chatbot for Quick Guidance
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
