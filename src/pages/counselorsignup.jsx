import React, { useState } from 'react';

const CounselorSignUp = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('description', description);
    formData.append('image', image);

    // Just log for now
    console.log({
      title,
      name,
      gender,
      email,
      password,
      description,
      image
    });

    alert("Counselor signed up successfully!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Counselor Sign Up</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Profile Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Dr., Mr., Ms."
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Create a password"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-32 w-32 object-cover rounded-full border shadow-md"
            />
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Description / Bio</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 h-28 resize-none outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us about your counseling experience, expertise, etc."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit & Register
        </button>
      </form>
    </div>
  );
};

export default CounselorSignUp;
