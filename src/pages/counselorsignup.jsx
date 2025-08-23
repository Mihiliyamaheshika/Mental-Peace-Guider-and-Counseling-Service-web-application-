import React, { useState } from "react";
import { registerCounselor } from "../services/authService";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlyzgligk/upload";
const UPLOAD_PRESET = "Counselor-image";

const CounselorSignUp = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availabilityDays, setAvailabilityDays] = useState([]);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleCheckboxChange = (day) => {
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image to Cloudinary if selected
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(CLOUDINARY_URL, formData);
        imageUrl = res.data.secure_url;
      }

      // Prepare payload matching backend DTO
   const payload = {
  Title: title.trim() || "",
  FullName: name.trim() || "",
  Gender: gender || "",
  Email: email.trim() || "",
  Password: password.trim() || "",
  ProfileName: name.trim() || "",
  Description: description.trim() || "",
  ImageUrl: imageUrl || "",
  AvailabilityDays: availabilityDays.length > 0 ? availabilityDays.join(",") : ""
};

      console.log("Payload being sent:", payload);

      // Call API to signup counselor
      await registerCounselor(payload);

      alert("Counselor registered successfully!");

      // Clear form
      setTitle(""); setName(""); setGender(""); setEmail(""); setPassword("");
      setDescription(""); setImage(null); setPreview(null); setAvailabilityDays([]);
    } catch (error) {
      const data = error.response?.data || error;
      console.error("API registerCounselor error full response:", data);

      if (data?.errors) {
        const messages = Object.values(data.errors).flat().join("\n");
        alert(`Registration failed:\n${messages}`);
      } else if (data?.title) {
        alert(`Registration failed: ${data.title}`);
      } else {
        alert(error?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-1">Counselor Sign Up</h2>
          <p className="text-gray-500">Join our community and start helping others</p>
        </div>

        <div className="space-y-4">
          {/* Profile Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Title</label>
            <input
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Dr., Mr., Ms."
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="flex gap-6">
              {["Male", "Female"].map(g => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio" name="gender" value={g} checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Create a password"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {preview && <img src={preview} alt="Preview" className="mt-3 h-28 w-28 object-cover rounded-full border shadow-md" />}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description / Bio</label>
            <textarea
              required value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="Tell us about your counseling experience"
            />
          </div>

          {/* Availability Days */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Available Days</label>
            <div className="flex flex-wrap gap-3">
              {daysOfWeek.map(day => (
                <label key={day} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-100">
                  <input type="checkbox" checked={availabilityDays.includes(day)} onChange={() => handleCheckboxChange(day)} />
                  <span className="text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Submit & Register"}
        </button>
      </form>
    </div>
  );
};

export default CounselorSignUp;
