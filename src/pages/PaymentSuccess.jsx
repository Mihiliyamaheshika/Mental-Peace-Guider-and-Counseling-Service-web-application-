import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const bookingId = queryParams.get("bookingId");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "success" ? (
        <>
          <h2>✅ Your payment was successful!</h2>
          <p>Booking ID: {bookingId}</p>
          <button
            style={{
              padding: "12px 20px",
              marginTop: "20px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/booked")}
          >
            Go to My Bookings
          </button>
        </>
      ) : (
        <h2>❌ Payment failed or cancelled.</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
