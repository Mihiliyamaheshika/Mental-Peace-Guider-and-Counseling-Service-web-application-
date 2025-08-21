import React, { useState } from 'react';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

const Booking = () => {
  const [formData, setFormData] = useState({
    country: '',
    name: '',
    phone: '',
    nic: '',
    email: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});

  const countries = [
    'Sri Lanka', 'India', 'USA', 'UK', 'Australia', 'Canada', 'Germany', 'France',
  ];

  const countryCodes = {
    'Sri Lanka': '+94',
    'India': '+91',
    'USA': '+1',
    'UK': '+44',
    'Australia': '+61',
    'Canada': '+1',
    'Germany': '+49',
    'France': '+33',
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.name || formData.name.length < 3) newErrors.name = 'Min 3 characters';
    const phoneRegex = /^[+\d][\d]{8,14}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone';
    if (!formData.nic || formData.nic.length < 10) newErrors.nic = 'Min 10 characters';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const code = countryCodes[value] || '';
      setFormData((prev) => ({
        ...prev,
        country: value,
        phone: code,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, country: '', phone: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Booking:', formData);

      // ✅ SweetAlert2 success dialog
      Swal.fire({
        icon: 'success',
        title: 'Request Sent!',
        text: 'Your request has been sent to the counselor.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#14b8a6', // teal-600
      });

      setFormData({
        country: '',
        name: '',
        phone: '',
        nic: '',
        email: '',
        reason: '',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white shadow rounded-lg mt-6 text-sm">
      <h2 className="text-xl font-semibold text-center text-teal-700 mb-3">Book Counseling</h2>




      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Country */}
        <div>
          <label className="block mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+94XXXXXXXXX"
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        {/* NIC */}
        <div>
          <label className="block mb-1">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="1990XXXXXXXV"
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          {errors.nic && <p className="text-red-500 text-xs">{errors.nic}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Reason */}
        <div>
          <label className="block mb-1">Reason (Optional)</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="2"
            placeholder="Briefly describe..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          ></textarea>
        </div>

{/* Professional Reminder */}
<p className="text-sm text-gray-600 text-center mb-4">
  Please ensure that you complete the payment <span className="font-semibold">once your booking is confirmed by the counselor</span> to secure your appointment.
</p>
        {/* Submit */}
        <div className="text-center pt-1">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-1.5 px-4 rounded text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
