import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/slices/authSlice";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (requireAuth) {
    // Route requires authentication - redirect to login if not authenticated
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  } else {
    // Route should not be accessible when authenticated (login/register pages)
    return !isAuthenticated ? children : <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
