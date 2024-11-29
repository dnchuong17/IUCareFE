import React from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Appointment from "./Appointment";
import CreateAppointment from "./CreateAppointment";
import SearchPatient from "./SearchPatient";

const AppointmentPage = () => {
  return (
    <div style={{ backgroundColor: '#F3F8FF', minHeight: '100vh', padding: '1rem' }}>
      <div className="flex">
        <Sidebar />
        <Calendar />

        <div className="flex flex-row ">
          <CreateAppointment />
          <SearchPatient />
        </div>
        <Appointment />
      </div>
    </div>
  );
};

export default AppointmentPage;