import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CounselorProfile from './CounselorProfile';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState('Mrs.Julie');
  const [action, setAction] = useState('Booking');
  const [startTime, setStartTime] = useState('');
  const [startAmPm, setStartAmPm] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endAmPm, setEndAmPm] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
  };

  const handleCounselorSelect = (name) => {
    setSelectedCounselor(name);
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
  };

  const handleActionChange = (actionType) => {
    setAction(actionType);
  };

  const timeOptions = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
  ];

  const counselorImage = "/images/c1.jpeg";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Your Journey to Mental Peace Begins Here!
      </h1>

      {/* User Info and Action Buttons */}
      <div className="bg-blue-50 p-4 rounded-lg shadow space-y-4">
        <p className="text-lg font-medium">User Name: Ann</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleActionChange('Booking')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Booking ✅
          </button>
          <button
            onClick={() => handleActionChange('Rescheduling')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Rescheduling 📅
          </button>
          <button
            onClick={() => handleActionChange('Cancelling')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancelling ❌
          </button>
        </div>
      </div>

      {/* Counselors Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Counselors' Profiles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Mrs.Melsy', 'Mrs.Aurora', 'Mrs.Julie', 'Mrs.Sheedy'].map((name) => (
            <CounselorProfile
              key={name}
              name={name}
              imagePath={counselorImage}
              onClick={() => handleCounselorSelect(name)}
            />
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4">
        <p className="text-lg font-medium">
          Availability of <span className="text-blue-600">{selectedCounselor}</span> ›
        </p>
        <div className="flex justify-center">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <p className="text-md text-gray-600 text-center">
          Selected Date: <span className="font-semibold">{selectedDate.toDateString()}</span>
        </p>

        {/* Start and End Time Period Selection */}
        <div className="flex flex-col items-center space-y-4">
          <label className="text-md font-medium text-gray-700">Select Start Time:</label>
          <div className="flex gap-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Start Time --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              value={startAmPm}
              onChange={(e) => setStartAmPm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- AM/PM --</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label className="text-md font-medium text-gray-700">Select End Time:</label>
          <div className="flex gap-2">
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- End Time --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              value={endAmPm}
              onChange={(e) => setEndAmPm(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- AM/PM --</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* Display Selected Time Period */}
          {startTime && startAmPm && endTime && endAmPm && (
            <p className="text-sm text-green-700 font-medium">
              Selected Time Period: {startTime} {startAmPm} - {endTime} {endAmPm}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <button
            onClick={() => handleActionChange('Booking')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Booking ✅
          </button>
          <button
            onClick={() => handleActionChange('Rescheduling')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Rescheduling 📅
          </button>
          <button
            onClick={() => handleActionChange('Cancelling')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancelling ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
