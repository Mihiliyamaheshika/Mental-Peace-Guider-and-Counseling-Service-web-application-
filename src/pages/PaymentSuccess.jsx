
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("order_id");

  const handleGoToBooked = () => {
    navigate("/booked");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="mb-6">Your booking ID: {bookingId}</p>
        <div className="flex justify-around">
          <button
            onClick={handleGoToBooked}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Booked Table
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
