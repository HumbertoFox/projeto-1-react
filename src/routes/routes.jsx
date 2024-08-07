import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/authcontext";
import { PrivateRoute } from "../components/privaterouts/privateroute";
import { LoginPage } from "../pages/login";
import { MenuRegistersPage } from "../pages/menu";
import { AgendaPage } from "../pages/agenda";
import { ConsultationDrXPage } from "../pages/consultationdrx";
import { ConsultationDrYPage } from "../pages/consultationdry";
import { ReportDoctorxPage } from "../pages/reportdoctorx";
import { ReportDoctoryPage } from "../pages/reportdoctory";
import { RegisterUserPage } from "../pages/registeruser";
import { RegisterDoctorsPage } from "../pages/registerdoctors";
import { EditUserPage } from "../pages/edituser";
import { EditPatientPage } from "../pages/editpatient";
import { RemoveUserPage } from "../pages/removeuser";
export const AppRouters = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registerUser" element={<PrivateRoute><RegisterUserPage /></PrivateRoute>} />
                    <Route path="/registerDoctors" element={<PrivateRoute><RegisterDoctorsPage /></PrivateRoute>} />
                    <Route path="/editarUser" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />
                    <Route path="/editPatient" element={<PrivateRoute><EditPatientPage /></PrivateRoute>} />
                    <Route path="/menuRegister" element={<PrivateRoute><MenuRegistersPage /></PrivateRoute>} />
                    <Route path="/agenda" element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
                    <Route path="/consultationDRX" element={<PrivateRoute><ConsultationDrXPage /></PrivateRoute>} />
                    <Route path="/consultationDRY" element={<PrivateRoute><ConsultationDrYPage /></PrivateRoute>} />
                    <Route path="/reportDoctorX" element={<PrivateRoute><ReportDoctorxPage /></PrivateRoute>} />
                    <Route path="/reportDoctorY" element={<PrivateRoute><ReportDoctoryPage /></PrivateRoute>} />
                    <Route path="/removeUser" element={<PrivateRoute><RemoveUserPage /></PrivateRoute>} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};