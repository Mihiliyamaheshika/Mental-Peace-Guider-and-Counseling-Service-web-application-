// App.js
// Import necessary modules for React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages/components
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
import Cancelled from "./pages/cancelled";
import Dashboard from "./pages/dashboard";
import CounselorProfile from "./pages/counselorprofile";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/counselor-profile/:name" element={<CounselorProfilePage />} />
         <Route path="/counselorprofile" element={<CounselorProfile/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/cancelled" element={<Cancelled />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/lifetips" element={<Lifetips />} />
        <Route path="/love" element={<Love />} />
        <Route path="/child" element={<Child />} />
        <Route path="/career" element={<Career />} />
        <Route path="/education" element={<Education />} />
        <Route path="/roleselection" element={<RoleSelection />} />
        <Route path="/immediate" element={<Immediate />} />
        <Route path="/counselorsignup" element={<CounselorSignup />} />
        <Route path="/payment/:sessionId" element={<Payment />} />
        <Route path="/paymentcancel" element={<PaymentCancel />} />
        <Route path="/paymentnotify" element={<PaymentNotify />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/progresstracker" element={<ProgressTracker />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
