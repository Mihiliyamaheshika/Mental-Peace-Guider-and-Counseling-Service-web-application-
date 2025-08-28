import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CounselorProfilePage = () => {
  const { id } = useParams(); // numeric ID from route
  const navigate = useNavigate();
  const location = useLocation();

  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Map backend data to state structure
  const mapCounselorData = (data) => ({
    id: data.counselorID || data.id,
    name: data.fullName || 'N/A',
    imagePath: data.imageUrl || data.image || '/images/default.png',
    details: {
      title: data.title || 'N/A',
      email: data.email || 'N/A',
      profileName: data.profileName || 'N/A',
      availability: data.availabilityDays || 'N/A',
      description: data.description || 'N/A',
    },
  });

  useEffect(() => {
    // Use state from navigation if available
    if (location.state && location.state.counselor) {
      setCounselor(mapCounselorData(location.state.counselor));
      setLoading(false);
    }
    // Or else fetch from backend
    else if (id) {
      axios.get(`https://localhost:5001/api/Counselors/${id}`)
        .then(res => {
          if (!res.data) throw new Error('Counselor not found');
          setCounselor(mapCounselorData(res.data));
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Counselor not found.');
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (loading) return <p className="text-center mt-6 text-gray-600">Loading...</p>;

  if (error) return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-red-600">{error}</h2>
      <button
        onClick={() => navigate('/Appointments')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Appointments
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Top Profile */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
        <img
          src={counselor.imagePath}
          alt={counselor.name}
          className="w-36 h-36 object-cover rounded-full border-4 border-blue-300 shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{counselor.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{counselor.details.description}</p>
      </div>

      {/* Detailed Info */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-gray-700 text-sm leading-relaxed">
        <p><strong>Title:</strong> {counselor.details.title}</p>
        <p><strong>Email:</strong> {counselor.details.email}</p>
        <p><strong>Profile Name:</strong> {counselor.details.profileName}</p>
        <p><strong>Availability:</strong> {counselor.details.availability}</p>

      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/Appointments')}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
        >
          Back to Counselors
        </button>
      </div>
    </div>
  );
};

export default CounselorProfilePage;
