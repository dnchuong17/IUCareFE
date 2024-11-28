import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';




const Appointment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [nameError, setNameError] = useState('');
    const [appointments, setAppointments] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate name
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            setNameError('Name must contain only letters and valid characters.');
            return;
        }

        // Save the appointment
        const newAppointment = { name, studentId, time, date };
        setAppointments([...appointments, newAppointment]);

        // Clear the form and close the modal
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
        <div className="fixed top-30 right-11 bottom-5 rounded-xl shadow-md h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg" style={{ height: '400px', overflowY: 'scroll' }}>
            <button className="absolute top-2 right-2 w-16 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors duration-300" onClick={toggleModal}>
                +
            </button>
            {isModalVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-700">Booking Appointment</h2>
                            <button className="text-gray-700 hover:text-gray-900" onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg text-gray-700">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Enter patient's full name"
                                        value={name}
                                        onChange={handleNameChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {nameError && <p className="text-red-500">{nameError}</p>}
                                </div>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg text-gray-700">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Enter student ID"
                                        value={studentId}
                                        onChange={handleStudentIdChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg text-gray-700">
                                <label className="block mb-2">Time Selection</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg text-gray-700">
                                <label className="block mb-2">Date Selection</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="bg-blue-100 p-4 rounded-lg flex justify-end space-x-2">
                                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300" onClick={toggleModal}>
                                    Close
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors duration-300">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Examining
                                </button>
                            </div>
                            <hr className="my-4 border-gray-300 border-dashed" />
                            <div className="flex justify-end">
                                <button className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300">
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
            </div>
        </div>
    );
}

export default Appointment;