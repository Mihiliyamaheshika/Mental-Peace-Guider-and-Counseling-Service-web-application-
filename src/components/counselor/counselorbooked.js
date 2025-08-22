import React, { useState } from 'react';

const CounselorBooked = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      user: 'John Doe',
      date: '2025-07-05',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      paid: true,
      confirmed: false,
    },
    {
      id: 2,
      user: 'Emily Smith',
      date: '2025-07-07',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      paid: false,
      confirmed: false,
    },
  ]);

  const confirmAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, confirmed: true } : appt
      )
    );
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

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
              <th className="px-4 py-2 text-left">Paid</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2 text-gray-800 font-medium">{appt.user}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{appt.date}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{appt.startTime}</td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{appt.endTime}</td>
                <td className="px-4 py-2 text-center font-medium">
                  {appt.paid ? (
                    <span className="text-green-700">Paid</span>
                  ) : (
                    <span className="text-red-600">Not Paid</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2 whitespace-nowrap">
                    {/* To Session */}
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

                    {/* Confirm */}
                    {!appt.confirmed && (
                      <button
                        onClick={() => confirmAppointment(appt.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs shadow transition duration-150"
                      >
                        Confirm
                      </button>
                    )}

                    {/* Cancel */}
                    <button
                      onClick={() => cancelAppointment(appt.id)}
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
