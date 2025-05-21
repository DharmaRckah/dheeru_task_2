import React from "react";
import { Navigate } from "react-router-dom";

// This middleware checks if a valid token is available in localStorage
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to login with a message
  if (!token) {
    return <Navigate to="/login" state={{ message: "Token not provided. Please log in first." }} replace />;
  }

  // If token is available, render the protected component
  return children;
};

export default PrivateRoute;
