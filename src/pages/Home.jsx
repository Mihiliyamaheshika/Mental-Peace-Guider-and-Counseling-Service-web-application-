import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-#B7D5E5 flex flex-col items-center justify-center px-4">
      {/* Navigation Bar */}
      <header className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-blue-900">Home</h1>
        <img src="/logo.png" alt="MindPeace Logo" className="h-8" />
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
          <button className="block w-full py-2 bg-blue-600 text-white rounded-lg my-2 hover:bg-blue-700 transition">
            Login
          </button>
          <button className="block w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Sign up
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-sm text-gray-600 mt-10 pb-4">
        <p>Copyright © 2025 Mentalpeace.com. All rights reserved.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#"><img src="/facebook-icon.png" className="h-6" alt="Facebook" /></a>
          <a href="#"><img src="/twitter-icon.png" className="h-6" alt="Twitter" /></a>
          <a href="#"><img src="/instagram-icon.png" className="h-6" alt="Instagram" /></a>
          <a href="#"><img src="/linkedin-icon.png" className="h-6" alt="LinkedIn" /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
