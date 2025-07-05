import React, { useState } from 'react';

const Booked = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      counselor: 'Mrs. Julie',
      date: '2025-07-05',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      paid: false,
    },
    {
      id: 2,
      counselor: 'Mrs. Aurora',
      date: '2025-07-07',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      paid: false,
    },
    {
      id: 3,
      counselor: 'Mrs. Sheedy',
      date: '2025-07-10',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      paid: false,
    },
  ]);

  const handlePayment = (id) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, paid: true } : session
      )
    );
    alert('Payment successful!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Booked Counseling Sessions</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-2 text-left">Counselor Name</th>
              <th className="px-6 py-2 text-left">Date</th>
              <th className="px-6 py-2 text-left">Start Time</th>
              <th className="px-6 py-2 text-left">End Time</th>
              <th className="px-6 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 text-gray-700">{session.counselor}</td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{session.date}</td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{session.startTime}</td>
                <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{session.endTime}</td>
                <td className="px-6 py-2">
                  <div className="flex justify-center space-x-2 whitespace-nowrap">
                    {/* Payment Button */}
                    {!session.paid && (
                      <button
                        onClick={() => handlePayment(session.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs shadow transition duration-150"
                      >
                        Payment
                      </button>
                    )}

                    {/* To Session Button */}
                    <button
                      className={`px-4 py-1 rounded-full text-xs shadow transition duration-150 ${
                        session.paid
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!session.paid}
                    >
                      To Session
                    </button>

                    {/* Reschedule */}
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full text-xs shadow transition duration-150">
                      Reschedule
                    </button>

                    {/* Cancel */}
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-xs shadow transition duration-150">
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

export default Booked;
