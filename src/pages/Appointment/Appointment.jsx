import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Api } from "../../utils/api";

const Appointment = ({ appointments, selectedDate }) => {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const api = new Api();

  const toggleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(!isModalOpen);
  };

  const handleCancelAppointment = async () => {
    const appointmentId = localStorage.getItem("appointmentId");

    if (!appointmentId) {
      console.error("No appointmentId found in localStorage");
      return;
    }

    try {
      await api.updateAppointmentStatus(
        selectedAppointment.appointmentId,
        "CANCELLED"
      );
      setSelectedAppointment({
        ...selectedAppointment,
        status: "CANCELLED",
      });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status: "CANCELLED" }
            : appointment
        )
      );
      setIsModalOpen(false); // Close the modal after updating the status
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };
  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !newTime) return;

    try {
      await api.editAppointmentTime(
        selectedAppointment.id,
        selectedAppointment.doctorId,
        selectedAppointment.patientId,
        newTime,
        selectedAppointment.status
      );
      setSelectedAppointment({
        ...selectedAppointment,
        time: newTime,
      });
      setIsModalOpen(false); // Close the modal after updating the time
    } catch (error) {
      console.error("Error editing appointment time:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleReschedule = () => {
    // Implement reschedule logic here
  };

  return (
    <div
      className="fixed top-72 right-11 rounded-xl shadow-md h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg"
      style={{ height: "500px", overflowY: "scroll" }}
    >
      <div className="mt-4 ml-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="border border-gray p-4 rounded-lg">
              <div className="flex justify-between text-gray-700">
                <p className="font-light text-gray-400">
                  <strong>Name</strong>
                </p>
                <p className="text-gray-700">{appointment.name}</p>
              </div>
              <div className="flex justify-between text-gray-700">
                <p className="font-light text-gray-400">
                  <strong>Student ID</strong>
                </p>
                <p className="text-gray-700">{appointment.studentId}</p>
              </div>

              <hr className="my-5 border-gray-300 border-dashed" />
              <div className="flex justify-between items-center text-gray-700">
                <div>
                  <p className="font-light">
                    <FaClock className="inline-block mr-1 text-black-100" />{" "}
                    {appointment.time}
                  </p>
                  <p className="font-light mx-5">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <Link
                  to="/medicalRecord"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Examining
                  </button>
                </Link>
              </div>
              <hr className="my-4 border-gray-300 border-dashed" />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {appointment.status === "Approved" && (
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>Approved</span>
                    </div>
                  )}
                  {appointment.status === "Cancelled" && (
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <span>Cancelled</span>
                    </div>
                  )}
                  {appointment.status === "Done" && (
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>Done</span>
                    </div>
                  )}
                </div>
                <button
                  className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300"
                  onClick={toggleModal}
                >
                  View details
                </button>
                {isModalOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="modal-title"
                  >
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
                      <h2
                        id="modal-title"
                        className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center"
                      >
                        Appointment Details
                      </h2>
                      <div className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Name:</span>{" "}
                          {appointment.name}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Student ID:</span>{" "}
                          {appointment.studentId}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Time:</span>{" "}
                          {appointment.time}
                        </p>
                      </div>
                      <div className="mt-8 flex justify-end space-x-3">
                        <button
                          className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                          onClick={toggleModal}
                        >
                          Close
                        </button>
                        <button
                          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          onClick={handleRescheduleAppointment}
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={handleCancelAppointment}
                          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                          Cancel
                        </button>
                      </div>
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                      <h2 className="text-xl font-bold mb-4">
                        Appointment Details
                      </h2>
                      <p>
                        <strong>Name:</strong> {appointment.name}
                      </p>
                      <p>
                        <strong>Student ID:</strong> {appointment.studentId}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {appointment.time}
                      </p>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={toggleModal}
                      >
                        Close
                      </button>
                      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        {" "}
                        Reschedule
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
