import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [daysWithAppointments, setDaysWithAppointments] = useState([]);

  //  khi người dùng chọn một ngày trên Calendar
  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  // cập nhật danh sách các ngày có cuộc hẹn từ Appointment
  const handleDaysWithAppointmentsChange = (days) => {
    setDaysWithAppointments(days);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg h-screen">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="w-full flex items-center justify-center mr-40">
        {/* Content Wrapper */}
        <div className="w-full">
          <Calendar
            onDateSelected={handleDateSelected}
            daysWithAppointments={daysWithAppointments}
          />
          <Appointment
            selectedDate={selectedDate}
            onDaysWithAppointmentsChange={handleDaysWithAppointmentsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
