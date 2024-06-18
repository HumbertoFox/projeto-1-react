import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";
export const PrivateRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : <Navigate to="/login" />;
};