import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { apiDbPostgres } from "../services/api/apis";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const tokenId = Cookies.get("authTokenIs");
        const tokenEmail = Cookies.get("authTokenEs");
        const tokenPass = Cookies.get("authTokenPs");
        const storedUser = { id: tokenId, email: tokenEmail, password: tokenPass };
        return storedUser ? storedUser : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const tokenIsLoggetdIn = Cookies.get("authTokenIl");
        return tokenIsLoggetdIn === "true";
    });
    const login = (userData) => {
        const statusUser = { "status": true }
        setIsLoggedIn(true);
        setUser(userData);
        Cookies.set("authTokenIs", userData.id, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("authTokenEs", userData.email, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("authTokenPs", userData.password, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("authTokenIl", "true", { secure: true, sameSite: "Strict", expires: 1 });
        apiDbPostgres(statusUser, "protected");
    };
    const logout = () => {
        const statusUser = { "status": false }
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove("authTokenIs");
        Cookies.remove("authTokenEs");
        Cookies.remove("authTokenPs");
        Cookies.remove("authTokenIl");
        apiDbPostgres(statusUser, "protected");
    };
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);