import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Booking = () => {
  const [formData, setFormData] = useState({
    country: '',
    name: '',
    phone: '',
    reason: '',
  });

  const [bookingInfo, setBookingInfo] = useState(null);
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

  useEffect(() => {
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    if (pendingBooking) setBookingInfo(JSON.parse(pendingBooking));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.name || formData.name.length < 3) newErrors.name = 'Min 3 characters';
    const phoneRegex = /^[+\d][\d]{8,14}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const code = countryCodes[value] || '';
      setFormData(prev => ({ ...prev, country: value, phone: code }));
      setErrors(prevErrors => ({ ...prevErrors, country: '', phone: '' }));
    } else if (name === 'phone') {

      // Allow only numbers after the initial  selected countryCode
      const countryCode = formData.country ? countryCodes[formData.country] : '';
      let cleanedValue = value;
      if (countryCode && value.startsWith(countryCode)) {
        cleanedValue = countryCode + value.slice(countryCode.length).replace(/\D/g, '');
      } else {
        cleanedValue = value.replace(/\D/g, '');
      }
      setFormData(prev => ({ ...prev, phone: cleanedValue }));
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingInfo) {
      Swal.fire({
        icon: 'error',
        title: 'No Counselor Selected',
        text: 'Please select a counselor and time before booking.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!validate()) return;

    // Parse start time to 24-hour format
    let hours = 0;
    let minutes = 0;
    const timeParts = bookingInfo.startTime.split(':');
    if (timeParts.length >= 2) {
      hours = parseInt(timeParts[0], 10);
      const minPart = timeParts[1].split(' ')[0];
      minutes = parseInt(minPart, 10);

      const modifier = bookingInfo.startTime.split(' ')[1];
      if (modifier) {
        if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
      }
    }

    const selectedDate = new Date(bookingInfo.date);
    selectedDate.setHours(hours, minutes, 0, 0);

    const pad = (num) => String(num).padStart(2, '0');
    const localISO = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}T${pad(selectedDate.getHours())}:${pad(selectedDate.getMinutes())}:00`;

    // Get logged-in userId from localStorage
    const userId = localStorage.getItem("userId");

    const finalBooking = {
      userID: userId ? parseInt(userId, 10) : null,
      counselorID: bookingInfo.counselorId,
      requestedDateTime: localISO,
      message: formData.reason || 'No reason provided',
      status: 'Requested',
    };

    try {
      await axios.post('https://localhost:5001/api/BookingRequests', finalBooking);

      Swal.fire({
        icon: 'success',
        title: 'Request Sent!',
        text: 'Your booking request has been sent to the counselor.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#14b8a6',
      });

      setFormData({
        country: '',
        name: '',
        phone: '',
        reason: '',
      });
      setBookingInfo(null);
      sessionStorage.removeItem('pendingBooking');
    } catch (error) {
      console.error('Error submitting booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Something went wrong while sending your booking request.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white shadow rounded-lg mt-6 text-sm">
      <h2 className="text-xl font-semibold text-center text-teal-700 mb-3">Book Counseling</h2>

      {bookingInfo && (
        <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm">
          <p><span className="font-semibold">Counselor:</span> {bookingInfo.counselorName}</p>
          <p><span className="font-semibold">Date:</span> {new Date(bookingInfo.date).toDateString()}</p>
          <p><span className="font-semibold">Time:</span> {bookingInfo.startTime} - {bookingInfo.endTime}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">Select country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
        </div>

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

        <p className="text-sm text-gray-600 text-center mb-4">
          Please ensure that you complete the payment <span className="font-semibold">once your booking is confirmed by the counselor</span> to secure your appointment.
        </p>

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
