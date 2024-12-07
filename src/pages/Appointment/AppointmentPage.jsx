import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const AppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [daysWithAppointments, setDaysWithAppointments] = useState([]);

    // When the user selects a date on the Calendar
    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    // Update the list of days with appointments from Appointment
    const handleDaysWithAppointmentsChange = (days) => {
        setDaysWithAppointments(days);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4">
                <h1 className="text-3xl font-semibold mb-4">Appointments</h1>

                <div className="flex gap-4">
                    {/* Calendar */}
                    <div className="w-1/2">
                        <Calendar
                            onDateSelected={handleDateSelected}
                            daysWithAppointments={daysWithAppointments}
                        />
                    </div>

                    {/* Appointment List */}
                    <div className="w-1/2">
                        <Appointment
                            selectedDate={selectedDate}
                            onDaysWithAppointmentsChange={handleDaysWithAppointmentsChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPage;