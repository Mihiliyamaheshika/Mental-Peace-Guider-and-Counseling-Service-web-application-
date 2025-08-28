import React from "react";
import { PhoneCall } from "lucide-react";

const Immediate = () => {
  // counselors' WhatsApp numbers 
  const counselors = ["94717543852"];

  const handleEmergencyChat = () => {
    // Pick a random counselor from  list
    const randomCounselor = counselors[Math.floor(Math.random() * counselors.length)];

    // Opens WhatsApp Web / App 
    window.open(
      `https://wa.me/${randomCounselor}?text=I%20need%20urgent%20help`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E8C2FF] to-white p-6">
      <div className="w-full max-w-md bg-white border-2 border-[#E8C2FF] shadow-xl rounded-xl p-8 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold text-[#9D00FF] text-center">
          You're Not Alone. We're Here for You.
        </h1>
        <p className="text-center text-gray-700">
          If you're feeling overwhelmed or in a crisis, please don’t wait. Tap the button below to immediately connect with an available counselor via WhatsApp.
        </p>

        <button
          onClick={handleEmergencyChat}
          className="bg-[#9D00FF] hover:bg-[#7A00CC] text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 animate-pulse"
        >
          <PhoneCall className="w-6 h-6" />
          <span>Chat with Counselor Now</span>
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          We’re here 24/7. Your safety matters most.
        </p>
      </div>
    </div>
  );
};

export default Immediate;
