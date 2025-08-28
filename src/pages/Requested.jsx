import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Requested = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);


  const loggedInUserID = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!loggedInUserID) {
        console.error("No logged-in user ID found!");
        setLoading(false);
        return;
      }

      try {
        //  Call backend endpoint to get bookings for user
        const res = await axios.get(
          `https://localhost:5001/api/BookingRequests/user/${loggedInUserID}`
        );
        setSessions(res.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [loggedInUserID]);

  if (loading)
    return <div className="p-6 text-center text-gray-700">Loading requested sessions...</div>;
  if (!sessions.length)
    return <div className="p-6 text-center text-gray-700">No requested sessions found.</div>;

  // Format date in Sri Lanka timezone
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Colombo',
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Colombo',
    });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Requested Counseling Sessions</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-2 text-left">Counselor Name</th>
              <th className="px-6 py-2 text-left">Date</th>
              <th className="px-6 py-2 text-left">Start Time</th>
              <th className="px-6 py-2 text-left">Message</th>
              <th className="px-6 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.map((session) => (
              <tr key={session.requestID} className="hover:bg-gray-50">
                <td className="px-6 py-2 text-gray-700">
                  {session.counselorName || `ID: ${session.counselorID}`}
                </td>
                <td className="px-6 py-2 text-gray-700">{formatDate(session.requestedDateTime)}</td>
                <td className="px-6 py-2 text-gray-700">{formatTime(session.requestedDateTime)}</td>
                <td className="px-6 py-2 text-gray-700">{session.message}</td>
                <td className="px-6 py-2 text-gray-700">{session.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requested;
