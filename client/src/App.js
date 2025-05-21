import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import BookingForm from "./components/BookingForm";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route for Booking */}
        <Route 
          path="/booking" 
          element={
            <PrivateRoute>
              <BookingForm />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
