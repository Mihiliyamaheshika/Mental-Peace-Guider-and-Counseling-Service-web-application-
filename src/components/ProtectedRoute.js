import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  // If user tries to access a route not allowed for their role
  if (allowedRoles && !allowedRoles.includes(user.role)) {

    // Redirect to correct dashboard instead of home
    if (user.role === "user") return <Navigate to="/dashboard" replace />;
    if (user.role === "counselor") return <Navigate to="/counselor/booked" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
