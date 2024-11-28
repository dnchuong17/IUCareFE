import React from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const Page1 = () => {
  return (
    <div style={{ backgroundColor: '#F3F8FF', minHeight: '100vh', padding: '1rem' }}>
      <div className="flex">
        <Sidebar />
        <Calendar />
        <Appointment />
      </div>
    </div>

  );
};

export default Page1;
