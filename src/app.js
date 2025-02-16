// Import necessary modules for React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages/components
import Home from "./pages/Home";
import Counseling from "./pages/Counseling";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import SignUp from "./pages/signup"; // ✅ Import the new SignUp page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* ✅ Added SignUp route */}
      </Routes>
    </Router>
  );
}

export default App;
