import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Icon X
import SearchForm from "./SearchForm";
import { Api } from "../../utils/api.ts";

const Appointment = ({ selectedDate, onDaysWithAppointmentsChange }) => {
    const [appointments, setAppointments] = useState([]);
    const [daysWithAppointments, setDaysWithAppointments] = useState([]);
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [newDateTime, setNewDateTime] = useState("");
    const [showEditMenu, setShowEditMenu] = useState(null);
    const [newStatus, setNewStatus] = useState("");
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
            const response = await api.getAppointment();
            const appointmentsArray = response.appointment || [];
            setAppointments(appointmentsArray);

            const days = appointmentsArray.map(appointment =>
                new Date(appointment.date).toISOString().split("T")[0]
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
                const filteredAppointments = appointmentsArray.map(appointment => {
                    const dateTime = new Date(appointment.appointment_time);
                    return {
                        ...appointment,
                        patientName: appointment.patient_name || "N/A",
                        studentId: appointment.student_id || "N/A",
                        date: dateTime.toLocaleDateString("en-US"),
                        time: dateTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                        status: appointment.status || "Pending"
                    };
                });

                setAppointments(filteredAppointments);
            } else {
                console.error("Unexpected response format: appointments is not an array.", appointmentsArray);
                setAppointments([]);
            }
        } catch (error) {
            console.error("Error fetching appointments for day:", error);
            setAppointments([]);
        }
    };

    const handleEditClick = (appointment) => {
        setShowEditMenu(appointment);
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

            await api.updateAppointmentTime(editingAppointment.appointment_id, appointmentRequest);

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
            setShowEditMenu(null);
            alert("Appointment time updated successfully.");
        } catch (error) {
            console.error("Error updating appointment:", error.response?.data || error.message);
            alert("Failed to update appointment. Please try again.");
        }
    };

    const handleStatusUpdate = async (appointment, newStatus) => {
        if (!['APPROVED', 'CANCELLED', 'DONE'].includes(newStatus)) {
            alert("Invalid status. Please select a valid status.");
            return;
        }

        try {
            await api.updateStatusAppointment(appointment.appointment_id, newStatus);

            setAppointments((prevAppointments) =>
                prevAppointments.map((appt) =>
                    appt.appointment_id === appointment.appointment_id
                        ? { ...appt, status: newStatus }
                        : appt
                )
            );

            setShowEditMenu(null);
            alert(`Appointment status updated to ${newStatus} successfully.`);
        } catch (error) {
            console.error("Error updating appointment status:", error.response?.data || error.message);
            alert("Failed to update appointment status. Please try again.");
        }
    };

    const handleExamine = (appointment) => {
        navigate("/medicalRecord", { state: { appointment } });
    };

    return (
        <div
            className="fixed top-72 right-11 h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg"
            style={{ height: "500px", overflowY: "scroll" }}
        >
            <div className="mt-4 ml-3">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
                    onClick={() => setShowSearchPopup(true)}
                >
                    Search
                </button>

                <SearchForm isOpen={showSearchPopup} onClose={() => setShowSearchPopup(false)} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <div key={index} className="border border-gray p-4 rounded-lg relative">
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
                                <div className="flex justify-between text-gray-700">
                                    <p className="font-light text-gray-400">
                                        <strong>Status</strong>
                                    </p>
                                    <p className="text-gray-700">{appointment.status}</p>
                                </div>
                                <hr className="my-5 border-gray-300 border-dashed" />
                                <div className="flex justify-between items-center text-gray-700">
                                    <div>
                                        <p className="font-light">
                                            <strong>Date</strong>: {appointment.date}
                                        </p>
                                        <p className="font-light">
                                            <strong>Time</strong>: {appointment.time}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                                            onClick={() => handleExamine(appointment)}
                                        >
                                            Examine
                                        </button>
                                        <FaEllipsisV
                                            className="text-gray-500 cursor-pointer"
                                            onClick={() => handleEditClick(appointment)}
                                        />
                                        {showEditMenu === appointment && (
                                            <div className="absolute top-0 right-0 mt-8 bg-white border rounded shadow-lg w-48">
                                                <div className="flex justify-between items-center px-4 py-2">
                                                    <span className="text-gray-700 font-medium">Edit Menu</span>
                                                    <button
                                                        className="text-red-500 hover:text-red-600"
                                                        onClick={() => setShowEditMenu(null)}
                                                    >
                                                        <AiOutlineClose />
                                                    </button>
                                                </div>
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                                    onClick={() => {
                                                        setEditingAppointment(appointment);
                                                        setNewDateTime("");
                                                    }}
                                                >
                                                    Update Time
                                                </button>
                                                <div className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                                        Update Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        className="mt-1 block w-full p-2 border rounded"
                                                        value={newStatus}
                                                        onChange={(e) => setNewStatus(e.target.value)}
                                                    >
                                                        <option value="APPROVED">Approved</option>
                                                        <option value="DONE">Done</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                    <button
                                                        className="bg-blue-500 text-white mt-2 px-4 py-1 rounded-md hover:bg-blue-600 transition"
                                                        onClick={() => handleStatusUpdate(appointment, newStatus)}
                                                    >
                                                        Save Status
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No appointments available</p>
                    )}
                </div>
            </div>

            {editingAppointment && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Edit Appointment</h3>
                            <button
                                className="text-red-500 hover:text-red-600"
                                onClick={() => setEditingAppointment(null)}
                            >
                                <AiOutlineClose />
                            </button>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">
                                New Date and Time:
                            </label>
                            <input
                                type="datetime-local"
                                id="datetime"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={newDateTime}
                                onChange={(e) => setNewDateTime(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                onClick={() => {
                                    setEditingAppointment(null);
                                    setShowEditMenu(null);
                                }}
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
    );
};

export default Appointment;
