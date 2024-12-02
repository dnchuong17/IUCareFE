import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const CreateAppointment = ({
    studentId,
    time,
    handleTimeChange,
    date,
    handleDateChange,
    isModalVisible,
    toggleModal,
    handleSubmit,
    name,
    handleSearchChange
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInfo, setFilteredInfo] = useState([]);
    const [showHints, setShowHints] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({ fullName: '', studentID: '' });
    {/*
    useEffect(() => {
        // Save student data in local storage
        const students = [
            { name: "Nguyen Duc Yen Nhi", studentID: "ITCSIU22253", phone: "0847141204", department: "IT", address: "Duc Lan" },
            { name: "Tran Le Bao Ngoc", studentID: "ITDSIU22233", phone: "083765321", department: "DS", address: "Mo Duc" },
            { name: "Nguyen Ngoc Thuyen", studentID: "BEIU22232", phone: "", department: "BE", address: "Mo Duc" }
        ];
        localStorage.setItem('students', JSON.stringify(students));
    }, []);
*/}

    useEffect(() => {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        setFilteredInfo(students);
    }, []);



    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const students = JSON.parse(localStorage.getItem('students')) || [];
            const filtered = students.filter(student =>
                student.studentID.toLowerCase().includes(term.toLowerCase()) ||
                student.fullName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredInfo(filtered);
            setShowHints(true);
        } else {
            setShowHints(false);
        }
    };

    const handleHintClick = (student) => {
        setSelectedStudent({ fullName: student.fullName, studentID: student.studentID });
        setSearchTerm('');
        setShowHints(false);
    };





    return (
        <>
            <div className="fixed top-60 right-2 w-1/6 h-10 flex items-center justify-center">
                <button className="h-8 w-80 mr-10 bottom-20 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-orange-800 transition-colors duration-300" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create Appointment
                </button>
            </div>
            {isModalVisible && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg mx-4 md:mx-0 md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-center text-gray-600 w-full">Booking Appointment</h2>
                            <button className="text-gray-700 hover:text-gray-900" onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-0.5">
                            <div className="p-2 rounded-lg text-gray-700">
                                <label className="block mb-2 font-medium text-blue-800">Search Information</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search StudentID"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="pl-10 pr-4 py-2 border rounded-lg w-full"
                                    />
                                    {showHints && (
                                        <ul className="absolute z-10 bg-white border rounded-lg w-full mt-1">
                                            {filteredInfo.map((student, index) => (
                                                <li
                                                    key={index}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => handleHintClick(student)}
                                                >
                                                    {student.studentID} - {student.fullName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 rounded-lg text-gray-700">
                                <label className="block mb-2 font-medium text-blue-800">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter patient's full name"
                                    value={selectedStudent.fullName}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, fullName: e.target.value })}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-2 rounded-lg text-gray-700 ">
                                <label className="block mb-2 font-medium text-blue-800">Student ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter student ID"
                                    value={selectedStudent.studentID}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, studentID: e.target.value })}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-2 rounded-lg text-gray-700 ">
                                <label className="block mb-2 font-medium text-blue-800">Select Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-2 rounded-lg text-gray-700 ">
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