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
    const fetchUserFromToken = (token) => {
        if (user !== null) {
            if (token === user.email) {
                setIsLoggedIn(true);
            };
        };
    };
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        Cookies.set("authToken", userData.email, { secure: true, sameSite: "Strict", expires: 1 });
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