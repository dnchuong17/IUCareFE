import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {FaClock, FaPlus, FaTimes} from "react-icons/fa";
import SearchForm from "./SearchForm";
// import Sidebar from "../../components/Sidebar"; // Adjust the path as necessary
import { Api } from "../../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../../assets/assets";

const Appointment = ({ selectedDate, onDaysWithAppointmentsChange }) => {
  const [appointments, setAppointments] = useState([]);
  const [daysWithAppointments, setDaysWithAppointments] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");
  const [activeEditPopup, setActiveEditPopup] = useState(null);
  const api = new Api();
  const navigate = useNavigate();

  const AppointmentConstant = {
    APPROVED: "APPROVED",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
  };


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
          const [datePart, timePart] = appointment.appointment_time.split('T');
          const appointmentDate = new Date(appointment.appointment_time);
          const formattedDate = appointmentDate.toLocaleDateString("UTC", { timeZone: "Asia/Ho_Chi_Minh" });
          const formattedTime = appointmentDate.toLocaleTimeString("UTC", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Ho_Chi_Minh",
          });

          return {
            ...appointment,
            patientName: appointment.patient_name || "N/A",
            studentId: appointment.student_id || "N/A",
            date: formattedDate,
            time: formattedTime,
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


  const handleEditClick = (appointmentId) => {
    setActiveEditPopup((prev) => (prev === appointmentId ? null : appointmentId));
  };


  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setNewDateTime("");
    setActiveEditPopup(null);
  };


  const handleSaveDateTime = async () => {
    if (!newDateTime) {
      toast.info("No records found for this patient.");      return;
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
      toast.success("Appointment time updated successfully."),
          {
            autoclose: 1000,
          };
    } catch (error) {
      console.error(
          "Error updating appointment:",
          error.response?.data || error.message
      );
      toast.error("Failed to update appointment. Please try again.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const appointment = appointments.find(app => app.appointment_id === appointmentId);
      if (!appointment) {
        toast.error("Appointment not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      await api.updateStatusAppointment(
          appointmentId,
          AppointmentConstant.CANCELLED,
          appointment.doctorId,
          appointment.patientId,
          appointment.appointment_time
      );

      setAppointments((prevAppointments) =>
          prevAppointments.map((app) =>
              app.appointment_id === appointmentId
                  ? { ...app, appointment_status: AppointmentConstant.CANCELLED }
                  : app
          )
      );

      toast.success("Appointment status updated to CANCELLED.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setActiveEditPopup(null);

    } catch (error) {
      console.error("Error cancelling appointment:", error.response?.data || error.message);
      toast.error("Failed to cancel appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };




  const handleExamine = (appointment) => {
    navigate("/medicalRecord", { state: { appointment } });
  };

  return (
      <div className="absolute p-4 max-h-[550px] w-4/5 overflow-y-auto">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mt-4 ml-3">
            {/* Appointments and Plus Button Wrapper */}
            <div className="flex flex-wrap gap-4">
              {/* Appointments Grid */}


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full ml-4">

                {/* Plus Button */}
                <button
                    className=" hover:bg-gray-200 hover:border-gray-700 cursor-pointer"
                    onClick={() => setShowSearchPopup(true)}
                >
                  <div className="border border-gray p-4 rounded-lg flex items-center justify-center border-dashed border-gray-40 h-[250px]">
                    <div
                        className="flex items-center justify-center w-10 h-10 border-2 border-dashed border-gray-400 rounded-full transition duration-300"
                    >
                      <FaPlus className="text-gray-400 text-2xl"/>
                    </div>
                  </div>
                </button>
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
                          <hr className="my-5 border-gray-300 border-dashed"/>
                          <div className="flex justify-between items-center text-gray-700">
                            <div>
                              <p className="font-light">
                                <FaClock className="inline-block mr-1 text-black-100"/>{" "}
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
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => handleExamine(appointment)}
                            >
                              Examine
                            </button>
                          </div>
                          <hr className="my-5 border-gray-300 border-dashed"/>

                          <div className="flex justify-between items-center mt-4">
                            {/* Status */}
                            <p
                                className={`text-sm font-semibold ${
                                    appointment.appointment_status === "APPROVED"
                                        ? "text-blue-500"
                                        : appointment.appointment_status === "CANCELLED"
                                            ? "text-red-500"
                                            : "text-green-500"
                                }`}
                            >
                              {appointment.appointment_status}
                            </p>


                            {/* Edit */}
                            <button
                                className="text-orange-500 font-medium cursor-pointer hover:underline"
                                onClick={() => handleEditClick(appointment.appointment_id)}
                            >
                              Edit
                            </button>

                            {/* Pop-up Edit */}
                            {activeEditPopup === appointment.appointment_id && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-md rounded-md z-50">
                                  <button
                                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                      onClick={() => setActiveEditPopup(null)}
                                  >
                                    <FaTimes size={20}/>
                                  </button>

                                  <button
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() => handleEditAppointment(appointment)}
                                  >
                                    Edit Appointment
                                  </button>
                                  <button
                                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() =>
                                          handleCancelAppointment(appointment.appointment_id)
                                      }
                                  >
                                    Cancel
                                  </button>
                                </div>

                            )}
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
                      {/*/!* Left Section *!/*/}
                      <div className="flex flex-col items-center justify-center space-x-8 ml-26 mt-8">
                        <div className="justify-center">
                          <p className="text-xl font-semibold text-orange-300 whitespace-nowrap">
                            You have no appointment today
                          </p>
                          <p className="text-md ml-10 text-gray-300 whitespace-nowrap">
                            Keep calm and have a rest day
                          </p>
                        </div>
                        {/*      <img*/}
                        {/*  src={assets.restday} // Replace with your image path*/}
                        {/*  alt="No appointments"*/}
                        {/*  className="w-56 h-56 gap-4"*/}
                        {/*/>*/}
                      </div>
                    </div>
                )}

              </div>

            </div>

            {/* Search Form */}
            <SearchForm
                isOpen={showSearchPopup}
                onClose={() => setShowSearchPopup(false)}
            />
          </div>
        </div>
        <ToastContainer />
      </div>

  );
};
Appointment.propTypes = {
  selectedDate: PropTypes.string,
  onDaysWithAppointmentsChange: PropTypes.func.isRequired,
};

export default Appointment;
