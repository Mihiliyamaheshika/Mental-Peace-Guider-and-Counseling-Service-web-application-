import React from 'react';

const CounselorProfile = ({ name, imagePath, onClick }) => {
  return (
    <div
      className="flex flex-col items-center space-y-2 p-3 border rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
      onClick={onClick}
    >
      <img
        src={"Mental-Peace-Guider-and-Counseling-Service-web-application-\public\c1.jpeg"}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <p className="text-center text-sm font-medium">{name}</p>
    </div>
  );
};

export default CounselorProfile;
