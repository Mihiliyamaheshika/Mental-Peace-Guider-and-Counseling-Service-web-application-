import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CounselorBooked = () => {
  const { user } = useContext(AuthContext); // get logged-in user from context
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get counselorId from context or fallback to localStorage
  const counselorId = Number(user?.CounselorId || user?.counselorId || localStorage.getItem('counselorId'));

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!counselorId) {
        console.warn('Counselor ID is missing! Waiting for login or localStorage...');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:5001/api/BookingRequests/counselor/${counselorId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [counselorId]);

  const confirmAppointment = (id) => {
    setAppointments(prev =>
      prev.map(appt =>
        appt.requestID === id ? { ...appt, confirmed: true } : appt
      )
    );
  };

  const cancelAppointment = (id) => {
    setAppointments(prev => prev.filter(appt => appt.requestID !== id));
  };

  const formatTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  if (loading) return <div className="p-6">Loading appointments...</div>;
  if (!appointments.length) return <div className="p-6">No bookings found for this counselor.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Counselor - Booked Appointments
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
            <tr>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {appointments.map(appt => (
              <tr key={appt.requestID} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2 text-gray-800 font-medium">{appt.userName || '-'}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatDate(appt.requestedDateTime)}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatTime(appt.requestedDateTime)}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatTime(appt.endDateTime)}</td>
                <td className="px-4 py-2 text-center font-medium">{appt.status || '-'}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2 whitespace-nowrap">
                    <button
                      className={`px-3 py-1 rounded-full text-xs shadow transition duration-150 ${
                        appt.confirmed && appt.paid
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!appt.confirmed || !appt.paid}
                    >
                      To Session
                    </button>

                    {!appt.confirmed && (
                      <button
                        onClick={() => confirmAppointment(appt.requestID)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs shadow transition duration-150"
                      >
                        Confirm
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(appt.requestID)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs shadow transition duration-150"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounselorBooked;
