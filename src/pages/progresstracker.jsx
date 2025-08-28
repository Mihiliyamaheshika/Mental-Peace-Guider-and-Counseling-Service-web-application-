import React, { useState } from "react";

// PHQ-9 Questionnaire
const phq9Questions = [
  { id: 1, text: "Little interest or pleasure in doing things" },
  { id: 2, text: "Feeling down, depressed, or hopeless" },
  { id: 3, text: "Trouble falling/staying asleep, or sleeping too much" },
  { id: 4, text: "Feeling tired or having little energy" },
  { id: 5, text: "Poor appetite or overeating" },
  { id: 6, text: "Feeling bad about yourself — or that you are a failure" },
  { id: 7, text: "Trouble concentrating on things, such as reading or watching TV" },
  { id: 8, text: "Moving/speaking slowly or being fidgety/restless" },
  { id: 9, text: "Thoughts that you would be better off dead or hurting yourself" },
];

// Standard PHQ-9 scoring options
const phq9Options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

// Interpretation categories
const interpretPHQ9 = (score) => {
  if (score <= 4) return "Minimal Depression";
  if (score <= 9) return "Mild Depression";
  if (score <= 14) return "Moderate Depression";
  if (score <= 19) return "Moderately Severe Depression";
  return "Severe Depression";
};

const PHQ9Tracker = () => {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalScore = Object.values(responses).reduce((acc, val) => acc + val, 0);
    setScore(totalScore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl border border-purple-200 p-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
          PHQ-9 Depression Self-Assessment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {phq9Questions.map((q) => (
            <div
              key={q.id}
              className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100"
            >
              <p className="text-lg font-medium text-gray-800 mb-4">{q.text}</p>
              <div className="flex flex-wrap gap-4">
                {phq9Options.map((opt) => (
                  <label
                    key={opt.label}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer ${responses[q.id] === opt.value
                        ? "border-purple-500 ring-2 ring-purple-300"
                        : ""
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt.value}
                      checked={responses[q.id] === opt.value}
                      onChange={() => handleChange(q.id, opt.value)}
                      className="hidden"
                    />
                    <span className="text-gray-700">{opt.label}</span>
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
              Submit Assessment
            </button>
          </div>
        </form>

        {score !== null && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-purple-700">
              Your PHQ-9 Score: {score} / 27
            </h2>
            <p className="text-gray-600 mt-2">
              Interpretation: <strong>{interpretPHQ9(score)}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              **** This is a self-assessment tool and not a medical diagnosis. Please
              consult a professional if you have concerns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PHQ9Tracker;
