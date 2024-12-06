import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const AppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState(""); // Trạng thái lưu ngày được chọn
    const [daysWithAppointments, setDaysWithAppointments] = useState([]); // Trạng thái lưu các ngày có cuộc hẹn

    // Hàm để xử lý khi người dùng chọn một ngày trên Calendar
    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    // Hàm để cập nhật danh sách các ngày có cuộc hẹn từ Appointment
    const handleDaysWithAppointmentsChange = (days) => {
        setDaysWithAppointments(days);
    };

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
