import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/authcontext";
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
                    <Route path="/registerUser" element={<RegisterUserPage />} />
                    <Route path="/registerDoctors" element={<RegisterDoctorsPage />} />
                    <Route path="/menuRegister" element={<MenuRegistersPage />} />
                    <Route path="/" element={<AgendaPage />} />
                    <Route path="/agenda" element={<AgendaPage />} />
                    <Route path="/consultationDRX" element={<ConsultationDrX />} />
                    <Route path="/consultationDRY" element={<ConsultationDrY />} />
                    <Route path="/reportDoctorX" element={<ReportDoctorxPage />} />
                    <Route path="/reportDoctorY" element={<ReportDoctoryPage />} />
                    <Route path="*" element={<AgendaPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};