// Import necessary modules for Firebase and React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app"; 
import { getDatabase, ref, set } from "firebase/database"; 

// Import components/pages for routing
import Home from "./pages/Home";
import Counseling from "./pages/Counseling";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0qGskMxSk12lYdnhRwEDQW134kR-NLzs",
  authDomain: "mental-counseling.firebaseapp.com",
  databaseURL: "https://mental-counseling-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mental-counseling",
  storageBucket: "mental-counseling.appspot.com",
  messagingSenderId: "468469112135",
  appId: "1:468469112135:web:52b4d32270ba0853bf8062",
  measurementId: "G-0TXMX3Y807"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Handle form submission for appointments
const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Retrieve form values
  const serviceType = document.getElementById('service-type').value;
  const selectedDate = document.getElementById('available-dates').value;
  const selectedTime = document.getElementById('available-times').value;

  if (serviceType && selectedDate && selectedTime) {
    try {
      // Generate a unique ID for each appointment
      const appointmentId = Date.now();

      // Create a reference to the 'appointments' node
      const appointmentRef = ref(db, 'appointments/' + appointmentId);

      // Set the appointment data
      await set(appointmentRef, {
        serviceType,
        date: selectedDate,
        time: selectedTime,
        status: 'pending' // Optional: add a status field
      });

      // Show success alert
      alert('Appointment successfully booked!');

      // Clear the form
      document.getElementById('appointment-form').reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error booking appointment. Please try again.');
    }
  } else {
    alert('Please fill in all fields.');
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
