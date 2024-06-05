import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);