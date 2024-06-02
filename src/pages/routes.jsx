import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./home";
import { ConsultationDrX } from "./consultationdrx";
import { ConsultationDrY } from "./consultationdry";
import { ReportDoctorxPage } from "./reportdoctorx";
import { ReportDoctoryPage } from "./reportdoctory";

export const AppRouters = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ConsultationDRX" element={<ConsultationDrX />} />
                <Route path="/ConsultationDRY" element={<ConsultationDrY />} />
                <Route path="/ReportDoctorX" element={<ReportDoctorxPage />} />
                <Route path="/ReportDoctorY" element={<ReportDoctoryPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
};