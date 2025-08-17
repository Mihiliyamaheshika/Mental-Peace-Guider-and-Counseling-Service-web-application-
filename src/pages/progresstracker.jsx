import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "How have you been feeling emotionally over the past week?",
    type: "scale",
  },
  {
    id: 2,
    text: "How often have you felt anxious, worried, or overwhelmed?",
    type: "frequency",
  },
  {
    id: 3,
    text: "How well have you been sleeping recently?",
    type: "scale",
  },
  {
    id: 4,
    text: "How would you rate your energy levels during the day?",
    type: "scale",
  },
  {
    id: 5,
    text: "How often did you feel hopeful about the future?",
    type: "frequency",
  },
  {
    id: 6,
    text: "How well have you been able to manage stress or challenges?",
    type: "scale",
  },
  {
    id: 7,
    text: "Have you felt connected to others (friends, family, colleagues)?",
    type: "yesno",
  },
  {
    id: 8,
    text: "How frequently have you engaged in activities you enjoy?",
    type: "frequency",
  },
  {
    id: 9,
    text: "Have you had any negative thoughts or urges that concerned you?",
    type: "yesno",
  },
  {
    id: 10,
    text: "Overall, how would you rate your mental health this week?",
    type: "scale10",
  },
];

const options = {
  scale: ["Very Low", "Low", "Neutral", "High", "Very High"],
  frequency: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  yesno: ["Yes", "No"],
  scale10: Array.from({ length: 10 }, (_, i) => `${i + 1}`),
};

const optionScores = {
  scale: {
    "Very Low": 1,
    "Low": 2,
    "Neutral": 3,
    "High": 4,
    "Very High": 5,
  },
  frequency: {
    "Never": 1,
    "Rarely": 2,
    "Sometimes": 3,
    "Often": 4,
    "Always": 5,
  },
  yesno: {
    Yes: 1,
    No: 5,
  },
  scale10: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`${i + 1}`, i + 1])),
};

const ProgressTracker = () => {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((q) => {
      const answer = responses[q.id];
      if (answer) {
        const value = optionScores[q.type][answer];
        totalScore += value;
        maxScore += q.type === "scale10" ? 10 : 5;
      }
    });

    return ((totalScore / maxScore) * 100).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculated = calculateScore();
    setScore(calculated);
    alert("Your mental health progress has been recorded. Thank you!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl border border-purple-200 p-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          Weekly Mental Health Progress Tracker
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100"
            >
              <p className="text-lg font-medium text-gray-800 mb-4">{q.text}</p>
              <div className="flex flex-wrap gap-4">
                {options[q.type].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer ${
                      responses[q.id] === opt
                        ? "border-purple-500 ring-2 ring-purple-300"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={responses[q.id] === opt}
                      onChange={() => handleChange(q.id, opt)}
                      className="accent-purple-600 hidden"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-md transition duration-300"
            >
              Submit Progress
            </button>
          </div>
        </form>

        {score !== null && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-purple-700">
              Your Mental Health Progress Score: {score}%
            </h2>
            <p className="text-gray-600 mt-2">
              This score reflects your overall well-being based on your responses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
