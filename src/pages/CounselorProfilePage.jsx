import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const counselorDetails = {
  'Mrs.Melsy': {
    imagePath: '/images/counselors/c1.jpeg',
    shortDescription: 'Expert in stress management and life coaching.',
    longDescription: `
      Mrs. Melsy has over 15 years of experience in helping individuals manage stress, overcome anxiety, and achieve a balanced lifestyle. 
      Her approach is empathetic and client-focused, blending mindfulness techniques with cognitive behavioral strategies.
      
      Areas of expertise:
      - Stress Management
      - Life Coaching
      - Emotional Wellbeing
    `,
  },
  'Mrs.Aurora': {
    imagePath: '/images/counselors/c2.jpeg',
    shortDescription: 'Specializes in relationship and family counseling.',
    longDescription: `
      With a background in family psychology, Mrs. Aurora helps couples and families rebuild trust, improve communication, and navigate conflicts.
      She is known for her compassionate listening and practical solutions.

      Areas of expertise:
      - Family Therapy
      - Relationship Counseling
      - Conflict Resolution
    `,
  },
  'Mrs.Julie': {
    imagePath: '/images/counselors/c3.jpeg',
    shortDescription: 'Focus on career guidance and motivational counseling.',
    longDescription: `
      Mrs. Julie brings a career-focused lens to counseling, helping individuals unlock their professional potential and find motivation during challenging times.

      Areas of expertise:
      - Career Development
      - Motivation Building
      - Goal Setting
    `,
  },
  'Mrs.Sheedy': {
    imagePath: '/images/counselors/c4.jpeg',
    shortDescription: 'Experienced in youth and child psychology counseling.',
    longDescription: `
      Mrs. Sheedy has worked with children and adolescents for over a decade, assisting with behavioral challenges, learning difficulties, and emotional growth.

      Areas of expertise:
      - Child Psychology
      - Behavioral Counseling
      - Educational Support
    `,
  },
};

const CounselorProfilePage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const counselor = counselorDetails[name];

  if (!counselor) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Counselor not found.</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Counselor Top Profile */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
        <img
          src={counselor.imagePath}
          alt={name}
          className="w-36 h-36 object-cover rounded-full border-4 border-blue-300 shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600 mt-2">{counselor.shortDescription}</p>
      </div>

      {/* Detailed Description */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg shadow-sm text-gray-700 leading-relaxed whitespace-pre-line text-sm">
        {counselor.longDescription}
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
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
