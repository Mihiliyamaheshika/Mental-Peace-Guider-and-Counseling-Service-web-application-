import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PaymentButton = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setSdkReady(true), 500); // simulate SDK ready

    // Check if redirected back from PayHere
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const orderId = urlParams.get("order_id");

    if (status === "success" && orderId) {
      const userID = Number(localStorage.getItem("userId"));
      const amount = 2500;

      axios
        .post("https://localhost:5001/api/Payments", {
          bookingID: Number(orderId),
          userID: userID,
          amount: amount,
          paymentStatus: "Paid",
        })
        .then(() => {
          navigate("/booked"); // redirect to booked page
        })
        .catch((err) => {
          console.error("Error saving payment:", err);
          alert("Payment succeeded but failed to save in DB.");
          navigate("/booked");
        });
    }
  }, [navigate]);

  // Updated handlePayment with popup
  const handlePayment = () => {
    const returnUrl = encodeURIComponent(
      `http://localhost:3000/payment-success?order_id=${id}`
    );
    const payHereUrl = `https://sandbox.payhere.lk/pay/o19d1e737?order_id=${id}&return_url=${returnUrl}`;

    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      payHereUrl,
      "PayHerePopup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Monitor popup closure and refresh bookings or update UI
    const popupTick = setInterval(async () => {
      if (popup.closed) {
        clearInterval(popupTick);

        try {
          // Mark booking as paid 
          await axios.put(
            `https://localhost:5001/api/Bookings/${id}/pay`,
            "Paid",
            { headers: { "Content-Type": "application/json" } }
          );

          // Redirect to booked page
          navigate("/booked");
        } catch (err) {
          console.error("Failed to mark booking as Paid:", err);
          navigate("/booked");
        }
      }
    }, 500);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
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
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span>Counselor Fee</span>
          <span>1500.00 LKR</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span>Booking Fee</span>
          <span>1000.00 LKR</span>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>
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
        }}
        onClick={handlePayment}
        disabled={!sdkReady}
      >
        {sdkReady ? "Pay Now" : "Loading Payment Gateway..."}
      </button>
    </div>
  );
};

export default PaymentButton;
