import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { AgendaPage } from "../pages/agenda";
import { AuthProvider } from "../contexts/authcontext";
import { EditUserPage } from "../pages/edituser";
import { PrivateRoute } from "../components/privaterouts/privateroute";
import { EditDoctorsPage } from "../pages/editdoctor";
import { EditPatientPage } from "../pages/editpatient";
import { BlockingUserPage } from "../pages/blockinguser";
import { RegisterUserPage } from "../pages/registeruser";
import { MenuRegistersPage } from "../pages/menu";
import { ReportDoctorxPage } from "../pages/reportdoctorx";
import { ReportDoctoryPage } from "../pages/reportdoctory";
import { ConsultationDrXPage } from "../pages/consultationdrx";
import { ConsultationDrYPage } from "../pages/consultationdry";
import { RegisterDoctorsPage } from "../pages/registerdoctors";
import { RegisterPatientPage } from "../pages/registerpatient";
export const AppRouters = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registerUser" element={<PrivateRoute><RegisterUserPage /></PrivateRoute>} />
                    <Route path="/registerDoctors" element={<PrivateRoute><RegisterDoctorsPage /></PrivateRoute>} />
                    <Route path="/registerPatient" element={<PrivateRoute><RegisterPatientPage /></PrivateRoute>} />
                    <Route path="/editDoctors" element={<PrivateRoute><EditDoctorsPage /></PrivateRoute>} />
                    <Route path="/editarUser" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />
                    <Route path="/editPatient" element={<PrivateRoute><EditPatientPage /></PrivateRoute>} />
                    <Route path="/menuRegister" element={<PrivateRoute><MenuRegistersPage /></PrivateRoute>} />
                    <Route path="/agenda" element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
                    <Route path="/consultationDRX" element={<PrivateRoute><ConsultationDrXPage /></PrivateRoute>} />
                    <Route path="/consultationDRY" element={<PrivateRoute><ConsultationDrYPage /></PrivateRoute>} />
                    <Route path="/reportDoctorX" element={<PrivateRoute><ReportDoctorxPage /></PrivateRoute>} />
                    <Route path="/reportDoctorY" element={<PrivateRoute><ReportDoctoryPage /></PrivateRoute>} />
                    <Route path="/blockingUser" element={<PrivateRoute><BlockingUserPage /></PrivateRoute>} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};