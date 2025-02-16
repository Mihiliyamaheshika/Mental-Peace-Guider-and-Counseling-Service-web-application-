import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("User Data:", data);
    // Add API call to register the user
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#B7D5E5] w-screen">
      {/* Navigation Bar */}
      <header className="w-screen flex justify-between items-center h-12 bg-white shadow-md px-0">
        <nav className="text-gray-800 text-lg font-semibold"></nav>
        <img src="/logo.png" alt="MindPeace Logo" className="h-20 mr-10" />
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Mental Peace Journey Begins Here!
        </h2>
      </div>

      {/* Sign-Up Form */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
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

export default SignUp;
