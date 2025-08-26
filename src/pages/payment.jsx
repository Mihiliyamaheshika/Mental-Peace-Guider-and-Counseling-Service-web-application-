import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentButton = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate SDK ready (since you're using direct PayHere link, no need for real SDK)
    setTimeout(() => setSdkReady(true), 1000);

    // Check if returning from PayHere with success
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status"); // example: ?status=success

    if (status === "success") {
      navigate("/booked"); // ✅ Navigate to Booked.jsx
    }
  }, [navigate]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Counseling Appointment Payment
      </h2>

      {/* Bill Section */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>Counselor Fee</span>
          <span>1500.00 LKR</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>Booking Fee</span>
          <span>1000.00 LKR</span>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          <span>Total</span>
          <span>2500.00 LKR</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        style={{
          width: "100%",
          padding: "12px 0",
          backgroundColor: sdkReady ? "#27ae60" : "#bdc3c7",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: sdkReady ? "pointer" : "not-allowed",
          transition: "background-color 0.3s",
        }}
        onClick={() => {
          // Redirect directly to PayHere sandbox link with return URL
          window.location.href =
            "https://sandbox.payhere.lk/pay/o19d1e737?status=success"; 
          //  Add return params so after payment you can catch it in useEffect
        }}
        disabled={!sdkReady}
      >
        {sdkReady ? "Pay Now" : "Loading Payment Gateway..."}
      </button>
    </div>
  );
};

export default PaymentButton;
