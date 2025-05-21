import { Navigate } from "react-router-dom";

// This middleware checks if a valid token is available in localStorage
const authMiddleware = () => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to login with a message
  if (!token) {
    return <Navigate to="/login" state={{ message: "Token not provided. Please log in first." }} replace />;
  }

  // If token is available, return null to allow access to the route
  return null;
};

export default authMiddleware;
