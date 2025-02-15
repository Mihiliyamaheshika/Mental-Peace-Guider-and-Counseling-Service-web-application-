import React from "react";

const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/3.jpg')" }} // Replace with your actual background image path
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
