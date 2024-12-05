import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const AppointmentPage = () => {

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main  */}
            <div className="flex-1 flex flex-col p-4">
                <h1 className="text-3xl font-semibold mb-4">Appointments</h1>

                <div className="flex gap-4">
                    {/* Calendar */}
                    <div className="w-1/2">
                        <Calendar />
                    </div>

                    {/* Appointment List */}
                    <div className="w-1/2">
                        <Appointment />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPage;
