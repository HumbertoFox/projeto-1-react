import React from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import {
    Relatory
} from "./relarory";
import {
    ConsultaDRA
} from "./consultationdra";
import {
    ConsultaDR
} from "./consultationdr";

export const AppRouters = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Relatory />} />
                <Route path="/ConsultationDRA" element={<ConsultaDRA />} />
                <Route path="/ConsultationDR" element={<ConsultaDR />} />
                <Route path="*" element={<Relatory />} />
            </Routes>
        </BrowserRouter>
    )
};