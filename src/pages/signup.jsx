import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebaseConfig"; // Firebase config import
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Import styles

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, { displayName: data.fullName });

      console.log("User registered:", user);

      //  Success Alert
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/login"; // Redirect to login page after clicking OK
      });

    } catch (error) {
      console.error("Error signing up:", error.message);

      //  Error Alert
      Swal.fire({
        title: "Sign-Up Failed!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#B7D5E5] w-screen">
      {/* Sign-Up Form */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" {...register("fullName", { required: "Full name is required" })} className="w-full p-2 mt-1 border rounded-md"/>
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} className="w-full p-2 mt-1 border rounded-md"/>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }})} className="w-full p-2 mt-1 border rounded-md"/>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
