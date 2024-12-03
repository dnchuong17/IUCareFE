import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Appointment = ({ appointments, selectedDate }) => {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === selectedDate
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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
