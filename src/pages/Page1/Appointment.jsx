import React, { useState } from 'react';
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

        <div className="fixed top-30 right-11 bottom-8 rounded-xl shadow-md h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4 rounded-lg shadow-lg" style={{ height: '400px', overflowY: 'scroll' }}>
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