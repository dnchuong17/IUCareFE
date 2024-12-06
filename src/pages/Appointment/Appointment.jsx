import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import SearchForm from "./SearchForm";
import { Api } from "../../utils/api.ts";

const Appointment = ({ selectedDate, onDaysWithAppointmentsChange }) => {
    const [appointments, setAppointments] = useState([]);
    const [daysWithAppointments, setDaysWithAppointments] = useState([]);
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const api = new Api();

    useEffect(() => {
        fetchAllAppointments();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchAppointmentsForDay(selectedDate);
        }
    }, [selectedDate]);

    // Fetch all appointments to determine days with appointments
    const fetchAllAppointments = async () => {
        try {
            const response = await api.getAllAppointments();
            const appointmentsArray = response.appointments || response || [];
            setAppointments(appointmentsArray);

            const days = appointmentsArray.map(appointment => new Date(appointment.appointment_time).toISOString().split("T")[0]);
            setDaysWithAppointments(days);
            onDaysWithAppointmentsChange(days);
        } catch (error) {
            console.error("Error fetching all appointments:", error);
        }
    };

    // Fetch appointments for a specific date
    const fetchAppointmentsForDay = async (date) => {
        try {
            const response = await api.getAppointment(date);
            const appointmentsArray = response || [];

            if (Array.isArray(appointmentsArray)) {
                const filteredAppointments = appointmentsArray.filter(appointment => {
                    const appointmentDate = new Date(appointment.appointment_time).toISOString().split("T")[0];
                    return appointmentDate === date;
                });

                // Map data directly from API response
                const appointmentsWithPatientInfo = filteredAppointments.map(appointment => ({
                    ...appointment,
                    patientName: appointment.patient_name || "N/A",
                    studentId: appointment.student_id || "N/A",
                }));

                setAppointments(appointmentsWithPatientInfo);
            } else {
                console.error("Unexpected response format: appointments is not an array.", appointmentsArray);
                setAppointments([]);
            }
        } catch (error) {
            console.error("Error fetching appointments for day:", error);
            setAppointments([]);
        }
    };

    const handleAppointmentCreated = (newAppointment) => {
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    };

    return (
        <div
            className="fixed top-72 right-11 h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg"
            style={{ height: "500px", overflowY: "scroll" }}
        >
            <div className="mt-4 ml-3">
                <div className="mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => setShowSearchPopup(true)}
                    >
                        Search Patient
                    </button>
                </div>

                <SearchForm
                    isOpen={showSearchPopup}
                    onClose={() => setShowSearchPopup(false)}
                    onAppointmentCreated={handleAppointmentCreated}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <div key={index} className="border border-gray p-4 rounded-lg">
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
                                            <FaClock className="inline-block mr-1 text-black-100" /> {appointment.appointment_time}
                                        </p>
                                        <p className="font-light mx-5">
                                            {new Date(appointment.appointment_time).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No appointments available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Appointment;
