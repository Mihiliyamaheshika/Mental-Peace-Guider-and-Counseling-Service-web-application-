// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";

// Pages & Components
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import Lifetips from "./pages/lifetips";
import Love from "./pages/love";
import Child from "./pages/child";
import Career from "./pages/career";
import Education from "./pages/education";
import Booked from "./pages/Booked";
import Requested from "./pages/Requested";
import Cancelled from "./pages/cancelled";
import Dashboard from "./pages/dashboard";
import CounselorProfile from "./pages/CounselorProfile";
import CounselorProfilePage from "./pages/CounselorProfilePage";
import RoleSelection from "./pages/roleselection";
import CounselorSignup from "./pages/counselorsignup";
import Payment from "./pages/payment";
import Immediate from "./pages/immediate";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentNotify from "./pages/PaymentNotify";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProgressTracker from "./pages/progresstracker";
import Chatbot from "./pages/chatbot";
import CounselorBooked from './components/counselor/counselorbooked';

// Updated Protected Route
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // If logged in but role mismatch, redirect to their correct dashboard
    if (user.role === "user") return <Navigate to="/dashboard" replace />;
    if (user.role === "counselor") return <Navigate to="/counselor/booked" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home & Auth */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/roleselection" element={<RoleSelection />} />
          <Route path="/counselorsignup" element={<CounselorSignup />} />

          {/* User Pages (Protected) */}
          <Route path="/dashboard" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute role="user"><Booking /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute role="user"><Appointments /></ProtectedRoute>} />
          <Route path="/booked" element={<ProtectedRoute role="user"><Booked /></ProtectedRoute>} />
          <Route path="/requested" element={<ProtectedRoute role="user"><Requested /></ProtectedRoute>} />
          <Route path="/cancelled" element={<ProtectedRoute role="user"><Cancelled /></ProtectedRoute>} />
          <Route path="/payment/:sessionId" element={<ProtectedRoute role="user"><Payment /></ProtectedRoute>} />
          <Route path="/paymentcancel" element={<ProtectedRoute role="user"><PaymentCancel /></ProtectedRoute>} />
          <Route path="/paymentnotify" element={<ProtectedRoute role="user"><PaymentNotify /></ProtectedRoute>} />
          <Route path="/paymentsuccess" element={<ProtectedRoute role="user"><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/progresstracker" element={<ProtectedRoute role="user"><ProgressTracker /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute role="user"><Chatbot /></ProtectedRoute>} />
          <Route path="/counselor-profile/:id" element={<ProtectedRoute role="user"><CounselorProfilePage /></ProtectedRoute>} />
          <Route path="/CounselorProfile" element={<ProtectedRoute role="user"><CounselorProfile /></ProtectedRoute>} />
          {/* Counselor Pages (Protected) */}
          <Route path="/counselor/booked" element={<ProtectedRoute role="counselor"><CounselorBooked /></ProtectedRoute>} />


          {/* Life Tips & Other Resources (Public) */}
          <Route path="/lifetips" element={<Lifetips />} />
          <Route path="/love" element={<Love />} />
          <Route path="/child" element={<Child />} />
          <Route path="/career" element={<Career />} />
          <Route path="/education" element={<Education />} />
          <Route path="/immediate" element={<Immediate />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
