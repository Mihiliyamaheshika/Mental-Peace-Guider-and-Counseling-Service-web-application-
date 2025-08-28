import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CancelledBookings = () => {
  const { user } = useContext(AuthContext);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id || localStorage.getItem('userId');

  // format start time
  const formatTime = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate and format end time wrapped in useCallback
  const getEndTime = useCallback((isoString, endIsoString) => {
    if (endIsoString) return formatTime(endIsoString); // Use end time if provided
    if (!isoString) return '-';
    const date = new Date(isoString);
    date.setHours(date.getHours() + 2); // default 2-hour session
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  useEffect(() => {
    const fetchCancelledBookings = async () => {
      if (!userId) return;

      try {
        //  Fetch all booking requests for this user
        const response = await axios.get(`https://localhost:5001/api/BookingRequests/user/${userId}`);
        const allBookings = response.data;

        //  Filter only cancelled bookings
        const cancelled = allBookings.filter(b => b.status === 'Cancelled');

        //  Map to the table structure with formatted times
        const formatted = cancelled.map(b => ({
          id: b.requestID,
          counselor: b.counselor?.name || b.counselorID, // Removed hash mark
          date: new Date(b.requestedDateTime).toLocaleDateString(),
          startTime: formatTime(b.requestedDateTime),
          endTime: getEndTime(b.requestedDateTime, b.endDateTime),
        }));

        setCancelledSessions(formatted);
      } catch (error) {
        console.error('Error fetching cancelled bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledBookings();
  }, [userId, getEndTime]); // add getEndTime as dependency

  if (loading) return <div className="p-6 text-center text-gray-600">Loading cancelled bookings...</div>;
  if (!cancelledSessions.length) return <div className="p-6 text-center text-gray-600">No cancelled bookings found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Cancelled Counseling Bookings</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-red-50 text-gray-800 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Counselor</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Start Time</th>
              <th className="px-6 py-3 text-left">End Time</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cancelledSessions.map(session => (
              <tr key={session.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 text-gray-700 font-medium">{session.counselor}</td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{session.date}</td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{session.startTime}</td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{session.endTime}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    Cancelled
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelledBookings;
