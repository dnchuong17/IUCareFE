// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Appointment from "./Appointment";
import { Api } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const api = new Api();

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorInfo = localStorage.getItem("doctorInfo");
      if (!doctorInfo) {
        toast.error("Doctor information is missing. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const { doctor_id } = JSON.parse(doctorInfo);

      try {
        // Fetch all appointments for the doctor for the next 30 days
        const response = await api.checkAppointmentsByDate(
          moment().format("YYYY-MM-DD")
        );
        setAppointments(response); // Assuming response is an array of appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchAppointments();
  }, [api]);

  return (
    <div className="dashboard-container">
      <Calendar appointments={appointments} setAppointments={setAppointments} />
      <Appointment
        appointments={appointments}
        selectedDate={moment().format("YYYY-MM-DD")}
      />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
