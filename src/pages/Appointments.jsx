import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CounselorProfile from './counselorprofile';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState('');
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

  const handleViewProfile = (name) => {
    navigate(`/counselor-profile/${name}`);
  };

  const handleActionChange = (actionType) => {
    setAction(actionType);
    if (actionType === 'Booking') {
      navigate('/booked');
    }
     else if (actionType === 'Cancelling') {
    navigate('/cancelled');
     }
    
  };

  const handleCancel = () => {
    setSelectedDate(new Date());
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
    setSelectedCounselor('');
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const timeOptions = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '01:00', '01:30',
    '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
    '05:00', '05:30',
  ];

  const counselorImage = "/images/c1.jpeg";

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-700">
        Your Journey to Mental Peace Begins Here!
      </h1>

      {/* User Info and Action Buttons */}
      <div className="bg-blue-50 p-3 rounded-lg shadow space-y-3">
        <p className="text-base font-medium">User Name: Ann</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleActionChange('Booking')}
            className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition"
          >
            Bookings
          </button>

          <button
            onClick={() => handleActionChange('Cancelling')}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
          >
            Cancellations
          </button>
        </div>
      </div>

      {/* Counselors Section with arrows */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Counselors' Profiles</h3>

        <div className="flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            ←
          </button>

          {/* Scrollable Counselor Grid */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide px-2"
            style={{ paddingBottom: '6px' }}
          >
            {['Mrs.Melsy', 'Mrs.Aurora', 'Mrs.Julie', 'Mrs.Sheedy'].map((name) => (
              <div key={name} className="flex flex-col items-center space-y-1 min-w-[140px] max-w-[160px]">
                <CounselorProfile
                  name={name}
                  imagePath={counselorImage}
                  onClick={() => handleViewProfile(name)}
                />
                <button
                  onClick={() => handleCounselorSelect(name)}
                  className={`w-4 h-4 rounded ${selectedCounselor === name ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-400 transition`}
                  title={`Select ${name}`}
                ></button>
                <span className="text-xs">{selectedCounselor === name ? 'Selected' : ''}</span>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Selected Counselor Name */}
      {selectedCounselor && (
        <p className="text-center text-teal-600 font-medium text-base">
          Selected Counselor: {selectedCounselor}
        </p>
      )}

      {/* Calendar Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-3">
        <p className="text-base font-semibold text-gray-700">
          Availability of <span className="text-teal-600">{selectedCounselor || '---'}</span> ›
        </p>

        <div className="flex justify-center mt-2 mb-2">
          <div className="p-2 bg-white rounded-md shadow-sm scale-90 sm:scale-90 md:scale-75 lg:scale-75">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="border-none"
              tileClassName={({ date }) => {
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                let classes = 'rounded-md py-1 px-2 transition text-xs';
                if (isToday) classes += ' bg-blue-100 text-blue-800 font-medium ';
                if (isSelected) classes += ' bg-teal-500 text-white ';
                else classes += ' hover:bg-teal-100 hover:text-teal-800 ';
                return classes;
              }}
            />
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Selected Date: <span className="font-semibold">{selectedDate.toDateString()}</span>
        </p>

        {/* Time Selection */}
        <div className="flex flex-col items-center space-y-3">
          <label className="text-sm font-medium text-gray-700">Select Start Time:</label>
          <div className="flex gap-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
            >
              <option value="">-- Start Time --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <select
              value={startAmPm}
              onChange={(e) => setStartAmPm(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
            >
              <option value="">--AM/PM--</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label className="text-sm font-medium text-gray-700">Select End Time:</label>
          <div className="flex gap-2">
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
            >
              <option value="">-- End Time --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <select
              value={endAmPm}
              onChange={(e) => setEndAmPm(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
            >
              <option value="">--AM/PM--</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {startTime && startAmPm && endTime && endAmPm && (
            <p className="text-sm text-green-700 font-medium">
              Selected Time Period: {startTime} {startAmPm} - {endTime} {endAmPm}
            </p>
          )}
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-3">
          <button
             onClick={() => navigate('/booking')}
            className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition"
          >
            Ready to book
          </button>

          <button
            onClick={handleCancel}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
