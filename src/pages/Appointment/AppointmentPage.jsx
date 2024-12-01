import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Appointment from "./Appointment";
import CreateAppointment from "./CreateAppointment";

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div style={{ backgroundColor: '#F3F8FF', minHeight: '100vh', padding: '1rem' }}>
            <div className="flex">
                <Sidebar />
                <Calendar setSelectedDate={setSelectedDate} />
                <div className="flex flex-row">
                    <CreateAppointment appointments={appointments} setAppointments={setAppointments} />
                </div>
                <Appointment appointments={appointments} />
            </div>
        </div>
    );
};

export default AppointmentPage;