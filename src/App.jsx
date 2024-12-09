import { Routes, Route } from "react-router-dom";
import TableList from "./pages/Patient/TableList.jsx";
import MedicalRecord from "./pages/Patient/MedicalRecord/MedicalRecord.jsx"; // Fix đường dẫn
import HomePage from "./pages/Home/HomePage.jsx";
import InformationForm from "./pages/Appointment/InformationForm.jsx";
import AppointmentPage from "./pages/Appointment/AppointmentPage.jsx";
import DoctorProfile from "./pages/Doctor/Profile.jsx";

import TopLoader from "./components/TopLoader.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <div className="relative flex-grow">
                    <div
                        className="bg-[#4cbcd831] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]"
                    />
                    <div
                        className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
                    />
                    <TopLoader />

                    {/* Routes */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/appointmentPage" element={
                            <ProtectedRoute>
                                <AppointmentPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/tableList" element={
                            <ProtectedRoute>
                                <TableList />
                            </ProtectedRoute>
                        } />
                        <Route path="/medicalRecord" element={
                            <ProtectedRoute>
                                <MedicalRecord />
                            </ProtectedRoute>
                        } />
                        <Route path="/information" element={
                            <ProtectedRoute>
                                <InformationForm />
                            </ProtectedRoute>
                        } />
                        <Route path="/doctorProfile" element={
                            <ProtectedRoute>
                                <DoctorProfile />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Routes>
                </div>
                <Footer />
            </div>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </AuthProvider>
    );
};

export default App;
