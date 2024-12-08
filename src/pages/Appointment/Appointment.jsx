import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaClock, FaPlus } from "react-icons/fa";
import SearchForm from "./SearchForm";
// import Sidebar from "../../components/Sidebar"; // Adjust the path as necessary
import { Api } from "../../utils/api.ts";

const Appointment = ({ selectedDate, onDaysWithAppointmentsChange }) => {
  const [appointments, setAppointments] = useState([]);
  const [setDaysWithAppointments] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");
  const api = new Api();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAppointmentsForDay(selectedDate);
    }
  }, [selectedDate]);

  const fetchAllAppointments = async () => {
    try {
      const response = await api.getAllAppointments();
      const appointmentsArray = response.appointments || [];
      setAppointments(appointmentsArray);

      const days = appointmentsArray.map(
        (appointment) =>
          new Date(appointment.appointment_time).toISOString().split("T")[0]
      );
      setDaysWithAppointments(days);
      onDaysWithAppointmentsChange(days);
    } catch (error) {
      console.error("Error fetching all appointments:", error);
    }
  };

  const fetchAppointmentsForDay = async (date) => {
    try {
      const response = await api.getAppointment(date);
      const appointmentsArray = response || [];

      if (Array.isArray(appointmentsArray)) {
        const filteredAppointments = appointmentsArray.map((appointment) => {
          const dateTime = new Date(appointment.appointment_time);
          return {
            ...appointment,
            patientName: appointment.patient_name || "N/A",
            studentId: appointment.student_id || "N/A",
            date: dateTime.toLocaleDateString("en-US"),
            time: dateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setAppointments(filteredAppointments);
      } else {
        console.error(
          "Unexpected response format: appointments is not an array.",
          appointmentsArray
        );
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments for day:", error);
      setAppointments([]);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setNewDateTime("");
  };

  const handleSaveDateTime = async () => {
    if (!newDateTime) {
      alert("Please provide a new date and time.");
      return;
    }

    try {
      const appointmentRequest = {
        doctorId: editingAppointment.doctorId,
        patientId: editingAppointment.patientId,
        time: newDateTime,
      };

      await api.updateAppointmentTime(
        editingAppointment.appointment_id,
        appointmentRequest
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointment_id === editingAppointment.appointment_id
            ? {
                ...appointment,
                date: new Date(newDateTime).toLocaleDateString("en-US"),
                time: new Date(newDateTime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : appointment
        )
      );

      setEditingAppointment(null);
      alert("Appointment time updated successfully.");
    } catch (error) {
      console.error(
        "Error updating appointment:",
        error.response?.data || error.message
      );
      alert("Failed to update appointment. Please try again.");
    }
  };

  const handleExamine = (appointment) => {
    navigate("/medicalRecord", { state: { appointment } });
  };

  return (
    <div
      className="p-4 min-h-screen shalow-lg ml-72"
      style={{ width: "calc(66.6667% - 90px)" }}
    >
      {/* Left Section */}
      <div className=" w-4/6  mb-72 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg">
        <div className="mt-4 ml-3">
          {/* Open SearchForm */}
          <button
            className="flex items-center bg-blue-400 border border-blue-300 px-1 text-white rounded-full  hover:bg-blue-700 transition duration-300 mt-1 mb-6"
            onClick={() => setShowSearchPopup(true)}
          >
            <FaPlus className="mr-2 text-sm" />
            Create Appointment
          </button>

          <SearchForm
            isOpen={showSearchPopup}
            onClose={() => setShowSearchPopup(false)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="border border-gray p-4 rounded-lg relative"
                >
                  <div className="flex justify-between text-gray-700">
                    <p className="font-light text-gray-400">
                      <strong>Name</strong>
                    </p>
                    <p className="text-gray-700">{appointment.patientName}</p>
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
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => handleExamine(appointment)}
                      >
                        Examine
                      </button>
                    </div>
                  </div>
                  <hr className="my-5 border-gray-300 border-dashed" />

                  <div className="flex justify-end">
                    <button
                      className="text-orange-500 text-end cursor-pointer"
                      onClick={() => handleEditClick(appointment)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="ml-72 mr-32 mb-20 z-20 height-80 flex items-center justify-center"
                style={{
                  width: "calc(66.6667% - 90px)",
                }}
              >
                {/* Left Section */}
                <div className="flex flex-col items-center justify-center space-x-8 ml-60">
                  <div className="justify-center">
                    <p className="text-xl font-semibold text-orange-300 whitespace-nowrap">
                      You have no appointment today
                    </p>
                    <p className="text-md ml-10 text-gray-300 whitespace-nowrap">
                      Keep calm and have a rest day
                    </p>
                  </div>
                  <img
                    src="src/assets/rb_16294.png" // Replace with your image path
                    alt="No appointments"
                    className="w-56 h-56 gap-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {editingAppointment && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg shadow-xl p-7 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
              <h3 className="text-2xl mt-4 font-semibold text-center text-gray-600 w-full mb-4">
                Edit Appointment
              </h3>
              <div className="mb-8">
                <label
                  htmlFor="datetime"
                  className="tblock mb-2 font-medium text-blue-800 mt-4"
                >
                  New Date and Time:
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  className="w-full py-2 px-1 pl-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDateTime}
                  onChange={(e) => setNewDateTime(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setEditingAppointment(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={handleSaveDateTime}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
Appointment.propTypes = {
  selectedDate: PropTypes.string,
  onDaysWithAppointmentsChange: PropTypes.func.isRequired,
};

export default Appointment;
