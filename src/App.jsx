import { Routes, Route } from "react-router-dom";
import Foorter from "./components/Footer.jsx";
import AppointmentPage from "./pages/Appointment/AppointmentPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
const App = () => {
    return (
        <div>
            <div className="relative overflow-hidden">

                <div
                    className="bg-[#4cbcd831] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem]" />

                <div
                    className="bg-[#6285c25b] absolute -z-10 top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
                <div className="flex flex-col h-screen ">
                    <Routes>
                        <Route
                            path="/*" element={
                                <div>
                                    < HomePage />
                                </div>
                            }
                        />
                        <Route path="Appointment/*" element={<AppointmentPage />} />
                    </Routes>
                </div>
            </div>

        </div>


    );
};

export default App;
