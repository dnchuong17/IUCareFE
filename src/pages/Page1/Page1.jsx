import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Appointment from "./Appointment";

const Page1 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Calendar />
      <Appointment />
    </div>

  );
};

export default Page1;
