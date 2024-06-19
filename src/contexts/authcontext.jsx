import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            fetchUserFromToken(token);
        };
    }, []);
    const fetchUserFromToken = async (token) => {
        try {
            const response = await fetch("/api/verifyToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                setIsLoggedIn(true);
            } else {
                logout();
            };
        } catch (error) {
            console.error("Error verifying token:", error);
            logout();
        };
    };
    const login = (userData, token) => {
        setIsLoggedIn(true);
        setUser(userData);
        Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });
    };
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove("authToken");
    };
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);