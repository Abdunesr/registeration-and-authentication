import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authprovider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
