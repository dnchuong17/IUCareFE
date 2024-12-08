import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [daysWithAppointments, setDaysWithAppointments] = useState([]);

  // Handle when a date is selected on the Calendar
  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  // Update the list of days with appointments from Appointment
  const handleDaysWithAppointmentsChange = (days) => {
    setDaysWithAppointments(days);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden gap-1">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-64 justify-start w-4/5 p-1">
        <div className="w-full">
          {/* Adjusted width based on screen size */}
          <Calendar
            onDateSelected={handleDateSelected}
            daysWithAppointments={daysWithAppointments}
          />
        </div>
        <div className="w-full">
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
