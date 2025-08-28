import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const CounselorBooked = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const counselorId = Number(
    user?.CounselorId || user?.counselorId || localStorage.getItem('counselorId')
  );

  //  Wrap fetchAppointments in useCallback
  const fetchAppointments = useCallback(async () => {
    if (!counselorId) {
      console.warn('Counselor ID is missing! Waiting for login or localStorage...');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:5001/api/BookingRequests/counselor/${counselorId}`
      );
      const requestAppointments = response.data;

      const enrichedAppointments = await Promise.all(
        requestAppointments.map(async (appt) => {
          try {
            const videoRes = await axios.get(
              `https://localhost:5001/api/Bookings/videoLink/${appt.requestID}`
            );
            return { ...appt, videoCallLink: videoRes.data?.videoCallLink || null };
          } catch (err) {
            console.error(`Failed to fetch video link for requestID ${appt.requestID}:`, err);
            return { ...appt, videoCallLink: null };
          }
        })
      );

      setAppointments(enrichedAppointments);

    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [counselorId]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);


  const confirmAppointment = async (appt) => {
    try {
      const payload = {
        requestID: appt.requestID,
        userID: appt.userID,
        counselorID: appt.counselorID,
        scheduledDateTime: appt.requestedDateTime,
        videoCallLink: appt.videoCallLink || '',
        status: 'Confirmed',
        isPaid: false,
        paymentReference: null,
      };

      await axios.post('https://localhost:5001/api/Bookings', payload);

      await axios.put(
        `https://localhost:5001/api/BookingRequests/${appt.requestID}/status`,
        JSON.stringify('Confirmed'),
        { headers: { 'Content-Type': 'application/json' } }
      );

      fetchAppointments();
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const cancelAppointment = async (appt) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f87171',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        const cancelledAt = new Date().toISOString();
        const reason = "Cancelled by counselor";

        await axios.put(
          `https://localhost:5001/api/BookingRequests/${appt.requestID}/status`,
          JSON.stringify('Cancelled'),
          { headers: { 'Content-Type': 'application/json' } }
        );

        await axios.post(
          `https://localhost:5001/api/CancelledBookings`,
          {
            bookingID: appt.requestID,
            cancelledBy: "Counselor",
            reason: reason,
            cancelledAt: cancelledAt,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        setAppointments((prev) =>
          prev.map((a) =>
            a.requestID === appt.requestID ? { ...a, status: "Cancelled" } : a
          )
        );

        Swal.fire({
          icon: 'success',
          title: 'Booking Cancelled',
          text: 'The booking has been successfully cancelled.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f87171',
        });

      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire({
          icon: 'error',
          title: 'Cancellation Failed',
          text: 'Unable to cancel the booking. Please try again later.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f87171',
        });
      }
    }
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

  const joinSession = async (requestID) => {
    try {
      const res = await axios.get(`https://localhost:5001/api/Bookings/videoLink/${requestID}`);
      const link = res.data?.videoCallLink;

      if (link) {
        window.open(link, "_blank");
      } else {
        alert("Session link not available yet.");
      }
    } catch (err) {
      console.error("Failed to fetch video link:", err);
      alert("Error fetching session link.");
    }
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
            {appointments.map((appt) => (
              <tr key={appt.requestID} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2 text-gray-800 font-medium">{appt.userName || '-'}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatDate(appt.requestedDateTime)}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatTime(appt.requestedDateTime)}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{formatTime(appt.endDateTime)}</td>
                <td className="px-4 py-2 text-center font-medium">{appt.status || '-'}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => joinSession(appt.requestID)}
                      className={`px-3 py-1 rounded-full text-xs shadow transition duration-150 ${appt.status === 'Confirmed'
                        ? 'bg-green-400 hover:bg-green-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      disabled={!(appt.status === 'Confirmed')}
                    >
                      To Session
                    </button>

                    {appt.status !== 'Confirmed' && appt.status !== 'Cancelled' && (
                      <button
                        onClick={() => confirmAppointment(appt)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs shadow transition duration-150"
                      >
                        Confirm
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(appt)}
                      disabled={!!appt.videoCallLink || appt.status === 'Cancelled'}
                      title={
                        appt.status === 'Cancelled'
                          ? 'Booking already cancelled'
                          : appt.videoCallLink
                            ? 'Cannot cancel once session link is available'
                            : 'Cancel this booking'
                      }
                      className={`px-3 py-1 rounded-full text-xs shadow transition duration-150
                        ${appt.status === 'Cancelled'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : appt.videoCallLink
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                      {appt.status === 'Cancelled' ? 'Cancelled' : 'Cancel'}
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
