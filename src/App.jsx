import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1/Page1.jsx";
import TableList from "./pages/Patient/TableList.jsx";
import MedicalRecord from "./pages/Patient/Medical Record/MedicalRecord.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Information from "./pages/Patient/Medical Record/Information.jsx"
import DoctorProfile from "./pages/Doctor/Profile.jsx"

const App = () => {
    return (
        <div>
            <div className="relative overflow-hidden">
                <div
                    className="bg-[#4cbcd831] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]"
                />
                <div
                    className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
                />
                <div className="flex flex-col h-screen">
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                <div>
                                    <HomePage />
                                </div>
                            }
                        />
                        <Route path="/page1/*" element={<Page1 />} />
                        <Route path="/tableList" element={<TableList />} />
                        <Route path="/medicalRecord" element={<MedicalRecord />} />
                        <Route path="/information" element={<Information />} />
                        <Route path="/doctorProfile" element={<DoctorProfile />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
