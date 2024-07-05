import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
export const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/login" />;
};