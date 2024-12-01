import React, { useState, useEffect } from "react";
import { FaClock } from 'react-icons/fa';
import CreateAppointment from './CreateAppointment';

const Appointment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [nameError, setNameError] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [updatedAppointments, setUpdatedAppointments] = useState(appointments);



    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };
    const handleClosePopup = () => {
        setSelectedAppointment(null);
    };
    const handleExamining = () => {
        if (selectedAppointment) {
            // Update the status of the selected appointment to "Examining"
            const updatedAppointment = { ...selectedAppointment, status: "Approved" };
            // Update the appointments list with the updated appointment
            const updatedAppointments = appointments.map((appointment) =>
                appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            );
            // Update the state with the updated appointments list
            setSelectedAppointment(updatedAppointment);
            // Optionally, you can also update the appointments state if you have it
            // setAppointments(updatedAppointments);
        }
    };

    const handleCancel = () => {
        if (selectedAppointment) {
            // Update the status of the selected appointment to "Cancelled"
            const updatedAppointment = { ...selectedAppointment, status: "Cancelled" };
            // Update the appointments list with the updated appointment
            const updatedAppointments = appointments.map((appointment) =>
                appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            );
            // Update the state with the updated appointments list
            setSelectedAppointment(updatedAppointment);
            // Optionally, you can also update the appointments state if you have it
            // setAppointments(updatedAppointments);
            setSelectedAppointment(null); // Close the popup after cancelling

        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate name
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            setNameError('Name must contain only letters and valid characters.');
            return;
        }

        // Save the appointment
        const newAppointment = { searchTerm, name, studentId, time, date };
        setAppointments([...appointments, newAppointment]);

        // Clear the form and close the modal
        setSearchTerm('');
        setName('');
        setStudentId('');
        setTime('');
        setDate('');
        setNameError('');
        console.log('Name:', name);
        console.log('Student ID:', studentId);
        toggleModal();

    };

    const handleClearAppointments = () => {
        setAppointments([]);
    };

    return (

        <div className="fixed top-72 right-11 rounded-xl shadow-md h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg" style={{ height: '500px', overflowY: 'scroll' }}>
            <CreateAppointment
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                handleSubmit={handleSubmit}
                name={name}
                handleNameChange={handleNameChange}
                nameError={nameError}
                studentId={studentId}
                handleStudentIdChange={handleStudentIdChange}
                time={time}
                handleTimeChange={handleTimeChange}
                date={date}
                handleDateChange={handleDateChange}
                handleSearchChange={handleSearchChange}
            />
            <div className="mt-4 ml-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {appointments.map((appointment, index) => (
                        <div key={index} className="border border-gray p-4 rounded-lg">
                            <div className="flex justify-between text-gray-700">
                                <p className="font-light text-gray-400"><strong>Name</strong></p>
                                <p className="text-gray-700">{appointment.name}</p>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <p className="font-light text-gray-400"><strong>Student ID</strong></p>
                                <p className="text-gray-700">{appointment.studentId}</p>
                            </div>

                            <hr className="my-5 border-gray-300 border-dashed" />
                            <div className="flex justify-between items-center text-gray-700">
                                <div>
                                    <p className="font-light">
                                        <FaClock className="inline-block mr-1 text-black-100" /> {appointment.time}
                                    </p>
                                    <p className="font-light mx-5">
                                        {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </p>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                    Examining
                                </button>

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
                                    onClick={() => handleViewDetails(appointment)}
                                >
                                    View details
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
                {appointments.length > 0 && (
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 mt-4" onClick={handleClearAppointments}>
                        Clear Appointments
                    </button>
                )}
                {selectedAppointment && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative w-1/3 max-w-4xl h-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out">
                            <div className="bg-blue-700 p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white">Appointment Details</h3>
                                    <button className="text-white hover:text-gray-300" onClick={handleClosePopup}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p><strong>Student Name:</strong> {selectedAppointment.studentName}</p>
                                <p><strong>Student ID:</strong> {selectedAppointment.studentId}</p>
                                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                <p><strong>Health Insecure:</strong> {selectedAppointment.healthInsecure}</p>
                                <p><strong>Status:</strong> {selectedAppointment.status}</p>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300" onClick={() => handleExamining(selectedAppointment.id)}>
                                        Examining
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300" onClick={() => handleCancel(selectedAppointment.id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Appointment;