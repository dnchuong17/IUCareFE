import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateAppointment = ({
    studentId,
    handleStudentIdChange,
    time,
    handleTimeChange,
    date,
    handleDateChange,
    isModalVisible,
    toggleModal,
    handleSubmit,
    name,
    handleNameChange
}) => {
    return (
        <>
            <div className="fixed top-60 right-2 w-1/6 h-10 flex items-center justify-center">
                <button className="h-8 w-80 mr-10 bottom-20 bg-orange-400 text-white rounded-full flex items-center justify-center hover:bg-orange-800 transition-colors duration-300" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create Appointment
                </button>
            </div>
            {isModalVisible && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-center text-gray-600 w-full">Booking Appointment</h2>
                            <button className="text-gray-700 hover:text-gray-900" onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1">
                            <div className="p-4 rounded-lg text-gray-700">
                                <label className="block mb-2 font-medium text-blue-800">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient's full name"
                                    value={name}
                                    onChange={handleNameChange}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-4 rounded-lg text-gray-700 ">
                                <label className="block mb-2 font-medium text-blue-800">Student ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter student ID"
                                    value={studentId}
                                    onChange={handleStudentIdChange}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-4 rounded-lg text-gray-700 ">
                                <label className="block mb-2 font-medium text-blue-800">Select Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-4 rounded-lg text-gray-700 ">
                                <label className="block mb-2 font-medium text-blue-800">Select Time</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors duration-300">
                                    Submit
                                </button>
                                <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300" onClick={toggleModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateAppointment;