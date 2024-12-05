import { Routes, Route } from "react-router-dom";
import TableList from "./pages/Patient/TableList.jsx";
import MedicalRecord from "./pages/Patient/Medical Record/MedicalRecord.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import InformationForm from "./pages/Appointment/InformationForm.jsx"
import AppointmentPage from "./pages/Appointment/AppointmentPage.jsx"
import DoctorProfile from "./pages/Doctor/Profile.jsx"

import TopLoader from "./components/TopLoader.jsx";
import Footer from "./components/Footer.jsx";


const App = () => {
    return (
        <div>
            <div className="relative">
                <div
                    className="bg-[#4cbcd831] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]"
                />
                <div
                    className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
                />
                <div className="flex flex-col h-screen">
                    <TopLoader />
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                <div>
                                    <HomePage />
                                </div>
                            }
                        />
                        <Route path="/appointmentPage" element={<AppointmentPage />} />
                        <Route path="/tableList" element={<TableList />} />
                        <Route path="/medicalRecord" element={<MedicalRecord />} />
                        <Route path="/information" element={<InformationForm />} />
                        <Route path="/doctorProfile" element={<DoctorProfile />} />

                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;