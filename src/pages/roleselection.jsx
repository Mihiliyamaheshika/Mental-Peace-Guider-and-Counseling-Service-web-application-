import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === 'counselor') {
      navigate('/counselorsignup');
    } else if (role === 'user') {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">How do you want to register?</h2>
        <p className="mb-4 text-gray-600">Please choose one option to continue the sign-up process.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelection('counselor')}
            className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Register as Counselor
          </button>

          <button
            onClick={() => handleSelection('user')}
            className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
          >
            Register as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
