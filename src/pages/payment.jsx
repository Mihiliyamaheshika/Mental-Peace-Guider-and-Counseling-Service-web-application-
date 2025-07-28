import React, { useEffect, useState } from "react";

const Payment = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const bookingAmount = 1000;
  const counselorFee = 1500;
  const totalAmount = bookingAmount + counselorFee;

  // Load PayHere SDK
  useEffect(() => {
    const script = document.createElement("script");
    // Use the correct live SDK URL for both sandbox & production
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;

    script.onload = () => {
      if (window.payhere) {
        setSdkReady(true);
      } else {
        console.error("PayHere SDK failed to load.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load PayHere SDK.");
      alert("Failed to load PayHere SDK. Please check your internet connection.");
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.payhere || !sdkReady) {
      alert("Payment gateway is still loading. Please wait a moment.");
      return;
    }

    const payment = {
      sandbox: true, // Set to true to use sandbox mode
      merchant_id: "1231360", // Your sandbox Merchant ID (replace if needed)
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:3000/payment-notify",

      order_id: "APPT001",
      items: "Counseling Appointment",
      amount: totalAmount,
      currency: "LKR",
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      phone: "0771234567",
      address: "Colombo",
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#ffffff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#2c3e50" }}>
        Appointment Payment Summary
      </h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px" }}>
        <span>Booking Amount</span>
        <span>LKR {bookingAmount.toFixed(2)}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px" }}>
        <span>Counselor Fee</span>
        <span>LKR {counselorFee.toFixed(2)}</span>
      </div>

      <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #ccc" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#34495e",
        }}
      >
        <span>Total Amount</span>
        <span>LKR {totalAmount.toFixed(2)}</span>
      </div>

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
        onClick={handlePayment}
        disabled={!sdkReady}
      >
        {sdkReady ? "Ready to Pay" : "Loading Payment Gateway..."}
      </button>
    </div>
  );
};

export default Payment;
