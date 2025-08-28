import React, { useState } from "react";

const topics = [
  {
    id: "mental-peace",
    title: "Mental Peace Activities",
    content: [
      "🧘 Practice deep breathing for 5 minutes each day.",
      "📓 Keep a gratitude journal to track positive experiences.",
      "🚶 Go for a peaceful walk in nature or green areas.",
      "📵 Limit screen time, especially on social media.",
    ],
  },
  {
    id: "nutrition",
    title: "Nutritional Balance Tips",
    content: [
      "🍎 Eat more whole foods like fruits, vegetables, and nuts.",
      "💧 Avoid processed sugar and drink enough water.",
      "🥑 Include Omega-3 fats and fiber-rich foods.",
      "🕒 Maintain regular meal times to reduce mood swings.",
    ],
  },
  {
    id: "meditation",
    title: "Meditation Tips",
    content: [
      "🌅 Start with 5 minutes of silence every morning.",
      "📲 Use apps like Headspace or Insight Timer.",
      "🌬️ Focus on your breath — inhale slowly and exhale deeply.",
      "🧠 Don’t judge thoughts, just observe and return to breath.",
    ],
  },
  {
    id: "stress",
    title: "Stress Relief Tips",
    content: [
      "🧩 Break big tasks into smaller ones to reduce pressure.",
      "🎶 Listen to calming music when feeling overwhelmed.",
      "🤝 Talk with a trusted friend or counselor.",
      "🏃 Engage in physical activity like jogging, dancing, or yoga.",
    ],
  },
  {
    id: "sleep",
    title: "Better Sleep Hygiene",
    content: [
      "🛏️ Maintain a consistent bedtime and wake-up schedule.",
      "📵 Avoid screens at least 30 minutes before bed.",
      "🌙 Create a calm nighttime routine (warm shower, tea, or reading).",
      "🕯️ Keep your room dark, quiet, and cool for quality sleep.",
    ],
  },
  {
    id: "work-life",
    title: "Work-Life Balance",
    content: [
      "📅 Plan your day and set clear work boundaries.",
      "❌ Avoid working during meal times or late nights.",
      "⏸️ Take 5–10 min breaks every 2 hours.",
      "💖 Spend quality time with family, hobbies, or self-care.",
    ],
  },
  {
    id: "positivity",
    title: "Positive Mindset",
    content: [
      "😊 Start your day with affirmations like 'I am capable'.",
      "🙌 Celebrate small achievements.",
      "📖 Read inspirational books or quotes.",
      "🌟 Surround yourself with positive people.",
    ],
  },
  {
    id: "self-care",
    title: "Self-Care Routines",
    content: [
      "🛁 Take a relaxing bath once a week.",
      "📚 Read or engage in hobbies that calm your mind.",
      "🌸 Treat yourself with kindness and patience.",
      "🚫 Say 'no' when you need to protect your mental energy.",
    ],
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi, Have a nice day! 😊 What do you want to know today?" },
  ]);
  const [step, setStep] = useState("selectTopic");

  const handleTopicSelect = (topic) => {
    const selected = topics.find((t) => t.id === topic);
    if (!selected) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: selected.title },
      { type: "bot", text: `Here are some helpful tips for ${selected.title}:` },
      ...selected.content.map((tip) => ({ type: "bot", text: tip })),
      { type: "bot", text: "💡 Would you like to explore another topic?" },
    ]);
    setStep("completed");
  };

  const resetChat = () => {
    setMessages([
      { type: "bot", text: "👋 Hi, Have a nice day! 😊 What do you want to know today?" },
    ]);
    setStep("selectTopic");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
          🌿 Mental Wellness Chatbot
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${msg.type === "bot"
                  ? "bg-blue-100 text-blue-800 self-start"
                  : "bg-green-100 text-green-800 self-end ml-auto"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {step === "selectTopic" && (
          <div className="flex flex-col gap-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id)}
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {topic.title}
              </button>
            ))}
          </div>
        )}

        {step === "completed" && (
          <div className="mt-4 text-center">
            <button
              onClick={resetChat}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              🌸 Ask Another Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
