import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchPatient = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentId, setStudentId] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSearch = () => {
        // Add your search logic here
        console.log(`Searching for student ID: ${studentId}`);
    };


    return (
        <>
            <div className="fixed top-60 right-64 w-1/6 h-10 flex items-center justify-center">
                <button className="h-8 w-80 mr-0 bottom-20 bg-orange-400 text-white rounded-full flex items-center justify-center hover:bg-orange-800 transition-colors duration-300" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Search Patient
                </button>
            </div>

            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 md:mx-0 md:w-1/2 relative">
                            <button className="absolute top-4 right-4 text-gray-700 hover:text-gray-900" onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="mb-2">
                                <label className="block ml-10 text-blue-700 text-md font-bold" htmlFor="studentId">
                                    Student ID
                                </label>
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <input
                                    type="text"
                                    id="studentId"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="shadow appearance-none border border-blue-300 rounded py-2 w-72 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter student ID"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SearchPatient;