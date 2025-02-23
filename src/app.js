// Import necessary modules for React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages/components
import Home from "./pages/Home";
import Counseling from "./pages/Counseling";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import Lifetips from "./pages/lifetips"; 
import Love from "./pages/love";
import Child from "./pages/child";
import Career from "./pages/career";
import Education from "./pages/education";
import Dashboard from "./pages/dashboard"; // ✅ Importing Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Added Dashboard route */}
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/lifetips" element={<Lifetips />} /> 
        <Route path="/love" element={<Love />} /> 
        <Route path="/child" element={<Child />} /> 
        <Route path="/career" element={<Career />} /> 
        <Route path="/education" element={<Education />} /> 
      </Routes>
    </Router>
  );
}

export default App;
