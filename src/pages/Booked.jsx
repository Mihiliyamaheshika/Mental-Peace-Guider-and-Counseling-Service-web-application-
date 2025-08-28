import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booked = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUserID = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!loggedInUserID) {
        console.error('No logged-in user ID found!');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://localhost:5001/api/Bookings/user/${loggedInUserID}`
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

  const handlePayment = async (bookingID) => {
    navigate(`/payment/${bookingID}`);

    try {
      await axios.put(
        `https://localhost:5001/api/Bookings/${bookingID}/pay`,
        "Paid",
        { headers: { "Content-Type": "application/json" } }
      );

      setSessions((prev) =>
        prev.map((s) =>
          s.bookingID === bookingID ? { ...s, isPaid: true } : s
        )
      );
    } catch (err) {
      console.error("Failed to mark booking as Paid:", err);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString();
  };

  const formatTime = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEndTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    date.setHours(date.getHours() + 2);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading)
    return <div className="p-6 text-center text-gray-700">Loading booked sessions...</div>;
  if (!sessions.length)
    return <div className="p-6 text-center text-gray-700">No booked sessions found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Booked Counseling Sessions</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-2 text-left">Counselor ID</th>
              <th className="px-6 py-2 text-left">Date</th>
              <th className="px-6 py-2 text-left">Start Time</th>
              <th className="px-6 py-2 text-left">End Time</th>
              <th className="px-6 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.map((session) => (
              <tr key={session.bookingID} className="hover:bg-gray-50">
                <td className="px-6 py-2 text-gray-700">
                  {session.counselor?.name || `ID: ${session.counselorID}`}
                </td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{formatDate(session.scheduledDateTime)}</td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{formatTime(session.scheduledDateTime)}</td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{getEndTime(session.scheduledDateTime)}</td>
                <td className="px-6 py-2">
                  <div className="flex justify-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handlePayment(session.bookingID)}
                      className={`px-4 py-1 rounded-full text-xs shadow transition duration-150 ${session.isPaid
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                      {session.isPaid ? 'Paid' : 'Do payment'}
                    </button>

                    <button
                      onClick={() => {
                        if (session.videoCallLink) {
                          window.open(session.videoCallLink, "_blank");
                        } else {
                          alert("Session link not available yet.");
                        }
                      }}
                      disabled={!session.isPaid}
                      className={`px-4 py-1 rounded-full text-xs shadow transition duration-150 ${session.isPaid
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        }`}
                    >
                      To Session
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

export default Booked;
