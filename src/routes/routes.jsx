import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../contexts/usercontext";
import { LoginPage } from "../pages/login";
import { HomePage } from "../pages/home";
import { ConsultationDrX } from "../pages/consultationdrx";
import { ConsultationDrY } from "../pages/consultationdry";
import { ReportDoctorxPage } from "../pages/reportdoctorx";
import { ReportDoctoryPage } from "../pages/reportdoctory";

export const AppRouters = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ConsultationDRX" element={<ConsultationDrX />} />
                    <Route path="/ConsultationDRY" element={<ConsultationDrY />} />
                    <Route path="/ReportDoctorX" element={<ReportDoctorxPage />} />
                    <Route path="/ReportDoctorY" element={<ReportDoctoryPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
};