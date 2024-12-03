// src/components/Appointment.jsx
import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Api } from "../../utils/api";
import { toast } from "react-toastify";

const Appointment = ({ appointments, setAppointments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const api = new Api();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setSelectedAppointment(null);
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleReschedule = async () => {
    if (!selectedAppointment) return;

    const newTime = prompt("Enter new time (HH:MM):", selectedAppointment.time);
    if (!newTime) return;

    try {
      await api.editAppointmentTime(selectedAppointment.id, newTime);
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === selectedAppointment.id ? { ...app, time: newTime } : app
        )
      );
      toast.success("Appointment rescheduled successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      toggleModal();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Failed to reschedule appointment.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) return;

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      await api.updateAppointmentStatus(selectedAppointment.id, "Cancelled");
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === selectedAppointment.id
            ? { ...app, status: "Cancelled" }
            : app
        )
      );
      toast.success("Appointment cancelled successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      toggleModal();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="fixed top-72 right-11 rounded-xl shadow-md h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 overflow-y-auto"
      style={{ height: "500px" }}
    >
      <div className="mt-4 ml-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray p-4 rounded-lg"
            >
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
                  <p className="font-light">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(appointment)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>

              {isModalOpen && selectedAppointment && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                  <div className="bg-white p-6 rounded-lg w-80">
                    <h2 className="text-xl font-bold mb-4">
                      Appointment Details
                    </h2>
                    <p>
                      <strong>Name:</strong> {selectedAppointment.name}
                    </p>
                    <p>
                      <strong>Student ID:</strong>{" "}
                      {selectedAppointment.studentId}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedAppointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedAppointment.time}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedAppointment.status}
                    </p>

                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        onClick={handleReschedule}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={toggleModal}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
