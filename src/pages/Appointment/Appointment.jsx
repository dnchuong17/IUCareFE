import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {FaClock, FaPlus, FaTimes} from "react-icons/fa";
import SearchForm from "./SearchForm";
import { Api } from "../../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const fetchAllAppointments = async (date) => {
    try {
      // Retrieve doctor account from local storage
      const account = localStorage.getItem("account");
      if (!account) {
        console.error("Doctor account not found in local storage.");
        return;
      }

      // Fetch the doctor by account to get the doctor_id
      const doctorResponse = await api.getDoctorByAccount(account);
      const doctorId = doctorResponse?.doctor_id; // Use `doctor_id` from the response

      if (!doctorId) {
        console.error("Doctor ID not found for the account:", account);
        return;
      }

      // Fetch appointments using the doctor_id
      const response = await api.getAppointment(date, doctorId);
      const appointmentsArray = response.appointment || [];
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
    console.log(date);
    try {
      // Retrieve doctor account from local storage
      const account = localStorage.getItem("account");
      if (!account) {
        console.error("Doctor account not found in local storage.");
        return;
      }

      // Fetch the doctor by account to get the doctor_id
      const doctorResponse = await api.getDoctorByAccount(account);
      const doctorId = doctorResponse?.doctor_id; // Use `doctor_id` from the response

      if (!doctorId) {
        console.error("Doctor ID not found for the account:", account);
        return;
      }

      // Fetch appointments for the specific day using the doctor_id
      const response = await api.getAppointment(date, doctorId);
      const appointmentsArray = response || [];

      if (Array.isArray(appointmentsArray)) {
        const filteredAppointments = appointmentsArray.map((appointment) => {
          const appointmentDate = new Date(appointment.appointment_time);
          appointmentDate.setHours(appointmentDate.getHours() - 7); // Adjust timezone

          const formattedDate = appointmentDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const formattedTime = appointmentDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Check if the appointment time has passed
          const currentDateTime = new Date();
          const isPastAppointment = currentDateTime >= appointmentDate;

          return {
            ...appointment,
            patientName: appointment.patient_name || "N/A",
            studentId: appointment.student_id || "N/A",
            date: formattedDate,
            time: formattedTime,
            isPastAppointment, // Add flag to indicate if the appointment has passed
          };
        });
        setAppointments(filteredAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments for the day:", error);
    }
  };






  const handleEditClick = (appointmentId) => {
    setActiveEditPopup((prev) => (prev === appointmentId ? null : appointmentId));
  };


  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setNewDateTime("");
    setActiveEditPopup(appointment.appointment_id);
  };



  const handleSaveDateTime = async () => {
    if (!newDateTime) {
      toast.info("Please select a new date and time.");
      return;
    }

    const selectedDateTime = new Date (newDateTime);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      toast.error("Selected time must be in the future.");
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
      setActiveEditPopup(null);
      toast.success("Appointment updated successfully.");
    } catch (error) {
      console.error("Error updating appointment:", error);
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
    const currentTime = new Date(); // Thời gian hiện tại
    const appointmentTime = new Date(appointment.time); // Giả sử appointment.time là thời gian của lịch hẹn
    const timeDifference = appointmentTime - currentTime; // Khoảng cách thời gian

    const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 phút tính bằng milliseconds

    if (appointment.isPastAppointment || (timeDifference > 0 && timeDifference <= FIFTEEN_MINUTES)) {
      // Thời gian đã qua hoặc gần với thời gian khám
      navigate("/medicalRecord", { state: { appointment } });
    } else if (timeDifference > FIFTEEN_MINUTES) {
      // Thời gian chưa gần tới giờ khám
      toast.info("You cannot access the medical record before the appointment time", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Thời gian đã qua (không cần điều kiện đặc biệt ở đây vì đã xử lý trong if đầu tiên)
      toast.error("The appointment time has already passed.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
                                {appointment.date}

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
                                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 shadow-md rounded-md p-4 z-50">
                                  <button
                                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                      onClick={() => setActiveEditPopup(null)}
                                  >
                                    <FaTimes size={20} />
                                  </button>

                                  {editingAppointment &&
                                  editingAppointment.appointment_id === appointment.appointment_id ? (
                                      <div>
                                        <label className="block text-gray-600 font-medium mb-2">New Appointment
                                          Time</label>
                                        <input
                                            type="datetime-local"
                                            value={newDateTime}
                                            onChange={(e) => setNewDateTime(e.target.value)}
                                            min={new Date().toISOString().slice(0, 16)}
                                            className="block w-full px-4 py-2 border rounded-md mb-4"
                                        />


                                        <button
                                            onClick={handleSaveDateTime}
                                            className="w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                        >
                                          Save
                                        </button>

                                        <button
                                            onClick={() => setEditingAppointment(null)}
                                            className="w-full text-center px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition mt-2"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                  ) : (
                                      <>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleEditAppointment(appointment)}
                                        >
                                          Edit Appointment
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleCancelAppointment(appointment.appointment_id)}
                                        >
                                          Cancel Appointment
                                        </button>
                                      </>
                                  )}
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
