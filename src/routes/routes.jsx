import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/authcontext";
import { PrivateRoute } from "../components/privaterouts/privateroute";
import { LoginPage } from "../pages/login";
import { HomePage } from "../pages/home";
import { ConsultationDrX } from "../pages/consultationdrx";
import { ConsultationDrY } from "../pages/consultationdry";
import { ReportDoctorxPage } from "../pages/reportdoctorx";
import { ReportDoctoryPage } from "../pages/reportdoctory";
import { RegisterUserPage } from "../pages/registeruser";
import { RegisterDoctorsPage } from "../pages/registerdoctor";
import { MenuRegistersPage } from "../pages/menu";
export const AppRouters = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registerUser" element={<PrivateRoute element={<RegisterUserPage />} />} />
                    <Route path="/registerDoctors" element={<PrivateRoute element={<RegisterDoctorsPage />} />} />
                    <Route path="/menuRegister" element={<PrivateRoute element={<MenuRegistersPage />} />} />
                    <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                    <Route path="/consultationDRX" element={<PrivateRoute element={<ConsultationDrX />} />} />
                    <Route path="/consultationDRY" element={<PrivateRoute element={<ConsultationDrY />} />} />
                    <Route path="/reportDoctorX" element={<PrivateRoute element={<ReportDoctorxPage />} />} />
                    <Route path="/reportDoctorY" element={<PrivateRoute element={<ReportDoctoryPage />} />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};