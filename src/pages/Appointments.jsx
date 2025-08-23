import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CounselorProfile from './CounselorProfile';
import axios from 'axios';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState(null); // store full counselor object
  const [action, setAction] = useState('Booking');
  const [startTime, setStartTime] = useState('');
  const [startAmPm, setStartAmPm] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endAmPm, setEndAmPm] = useState('');
  const [counselors, setCounselors] = useState([]);

  const timeOptions = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '01:00', '01:30',
    '02:00', '02:30', '03:00', '03:30', '04:00', '04:30',
    '05:00', '05:30',
  ];

  // Map weekday names -> JS day index
  const weekdayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Fetch counselors from backend
  useEffect(() => {
    axios.get('https://localhost:5001/api/Counselors')
      .then(res => {
        const mapped = res.data.map(c => ({
          counselorID: c.counselorID,
          fullName: c.fullName,
          title: c.title,
          email: c.email,
          profileName: c.profileName,
          description: c.description,
          imageUrl: c.imageUrl || '/images/c1.jpeg',
          availabilityDays: c.availabilityDays, // e.g. "Friday,Sunday"
        }));
        setCounselors(mapped);
      })
      .catch(err => console.error('Error fetching counselors:', err));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
  };

  const handleCounselorSelect = (counselor) => {
    setSelectedCounselor(counselor); // store the full counselor object
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
  };

  const handleViewProfile = (c) => {
    navigate(`/counselor-profile/${c.counselorID}`, { state: { counselor: c } });
  };

  const handleActionChange = (actionType) => {
    setAction(actionType);
    if (actionType === 'Booking') navigate('/booked');
    else if (actionType === 'Cancelling') navigate('/cancelled');
  };

  const handleCancel = () => {
    setSelectedDate(new Date());
    setStartTime('');
    setStartAmPm('');
    setEndTime('');
    setEndAmPm('');
    setSelectedCounselor(null);
  };

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });

  // Convert availability string -> weekday indices
  const availableDays = selectedCounselor?.availabilityDays
    ?.split(',')
    .map(day => weekdayMap[day.trim()]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-700">
        Your Journey to Mental Peace Begins Here!
      </h1>

      <div className="bg-blue-50 p-3 rounded-lg shadow space-y-3">
        <p className="text-base font-medium">
          Dear User, here's is your approved and cancelled booking list
        </p>
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

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Counselors' Profiles</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            ←
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scrollbar-hide px-2"
            style={{ paddingBottom: '6px' }}
          >
            {counselors.map((c) => (
              <div
                key={c.counselorID}
                className="flex flex-col items-center space-y-1 min-w-[140px] max-w-[160px]"
              >
                <CounselorProfile
                  name={c.fullName}
                  imagePath={c.imageUrl}
                  title={c.title}
                  onClick={() => handleViewProfile(c)}
                />

                <button
                  onClick={() => handleCounselorSelect(c)}
                  className={`w-4 h-4 rounded ${
                    selectedCounselor?.counselorID === c.counselorID
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  } hover:bg-green-400 transition`}
                  title={`Select ${c.fullName}`}
                ></button>
                <span className="text-xs">
                  {selectedCounselor?.counselorID === c.counselorID ? 'Selected' : ''}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            →
          </button>
        </div>
      </div>

      {selectedCounselor && (
        <p className="text-center text-teal-600 font-medium text-base">
          Selected Counselor: {selectedCounselor.fullName}
        </p>
        
      )}

      <div className="bg-gray-50 p-4 rounded-lg shadow space-y-3">
        <p className="text-base font-semibold text-gray-700">
          Availability of{' '}
          <span className="text-teal-600">{selectedCounselor?.fullName || '---'}</span> 
       <span className="text-slate-400" > | *** Available days are highlighted in green on the calendar for easy identification.***|</span> 
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
                const isAvailable =
                  availableDays && availableDays.includes(date.getDay());

                let classes = 'rounded-md py-1 px-2 transition text-xs';
                if (isAvailable) classes += ' bg-green-100 text-green-800 font-semibold ';
                if (isToday) classes += ' border border-blue-400 ';
                if (isSelected) classes += ' bg-teal-500 text-white ';
                else classes += ' hover:bg-teal-100 hover:text-teal-800 ';
                return classes;
              }}
            />
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Selected Date:{' '}
          <span className="font-semibold">{selectedDate.toDateString()}</span>
        </p>

        <div className="flex flex-col items-center space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Select Start Time:
          </label>
          <div className="flex gap-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
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
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
            >
              <option value="">--AM/PM--</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <label className="text-sm font-medium text-gray-700">
            Select End Time:
          </label>
          <div className="flex gap-2">
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-teal-400"
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
