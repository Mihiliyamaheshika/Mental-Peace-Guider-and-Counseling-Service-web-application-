import React from 'react';

const CounselorProfile = ({ name, imagePath, description, onClick }) => {
  return (
    <div
      className="max-w-xs bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer p-4 flex flex-col items-center text-center"
      onClick={onClick}
    >
      <img
        src={imagePath}
        alt={name}
        className="w-28 h-28 object-cover rounded-full border-4 border-blue-200 shadow-sm mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default CounselorProfile;
