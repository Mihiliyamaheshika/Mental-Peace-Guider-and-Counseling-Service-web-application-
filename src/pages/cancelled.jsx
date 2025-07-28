import React from 'react';

const CancelledBookings = () => {
  const cancelledSessions = [
    {
      id: 1,
      counselor: 'Mrs. Julie',
      date: '2025-06-28',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
    },
    {
      id: 2,
      counselor: 'Mrs. Aurora',
      date: '2025-07-01',
      startTime: '3:00 PM',
      endTime: '4:00 PM',
    },
    {
      id: 3,
      counselor: 'Mrs. Sheedy',
      date: '2025-07-03',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Cancelled Counseling Bookings</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-red-200 to-red-300 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Counselor Name</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Start Time</th>
              <th className="px-6 py-4 text-left">End Time</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cancelledSessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-700">{session.counselor}</td>
                <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{session.date}</td>
                <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{session.startTime}</td>
                <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{session.endTime}</td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full text-xs shadow transition duration-150">
                    Cancelled
                  </button>
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
