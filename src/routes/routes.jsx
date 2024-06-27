import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/authcontext";
import { PrivateRoute } from "../components/privaterouts/privateroute";
import { LoginPage } from "../pages/login";
import { MenuRegistersPage } from "../pages/menu";
import { AgendaPage } from "../pages/agenda";
import { ConsultationDrX } from "../pages/consultationdrx";
import { ConsultationDrY } from "../pages/consultationdry";
import { ReportDoctorxPage } from "../pages/reportdoctorx";
import { ReportDoctoryPage } from "../pages/reportdoctory";
import { RegisterUserPage } from "../pages/registeruser";
import { RegisterDoctorsPage } from "../pages/registerdoctors";
export const AppRouters = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registerUser" element={<PrivateRoute element={<RegisterUserPage />} />} />
                    <Route path="/registerDoctors" element={<PrivateRoute element={<RegisterDoctorsPage />} />} />
                    <Route path="/menuRegister" element={<PrivateRoute element={<MenuRegistersPage />} />} />
                    <Route path="/" element={<PrivateRoute element={<AgendaPage />} />} />
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