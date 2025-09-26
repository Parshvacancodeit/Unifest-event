import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getCurrentUser } from "./services/authService";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    // Redirect to landing page instead of login after logout
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
