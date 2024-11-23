import React, { useState } from "react";
import { FiCheckCircle, FiSearch, FiFilter, FiSettings } from "react-icons/fi";
import Patients from "./Patients";

const TableList = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsCount, setPatientsCount] = useState(0);
    const totalPages = 4;

    const handleAddPatient = () => {
        setIsPopupOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
            {/* Add Patient*/}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <span className="bg-gray-200 p-3 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="h-6 w-6 text-blue-600" />
                    </span>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-700">Patients</h1>
                        <p className="text-gray-500">{patientsCount}</p>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 flex items-center space-x-2"
                    onClick={handleAddPatient}
                    aria-label="Add Patient"
                >
                    <FiCheckCircle /> <span>Add Patient</span>
                </button>
            </div>

            {/* Patient List */}
            <div className="mt-6 bg-white shadow-lg rounded-lg w-full max-w-5xl">
                {/* Search */}
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 w-full">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-2/3 border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            aria-label="Search patients"
                        />
                    </div>
                    <div className="flex space-x-3">
                        <button
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                            aria-label="Sort patients"
                        >
                            <FiSettings /> <span>Sort</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                            aria-label="Filter patients"
                        >
                            <FiFilter /> <span>Filter</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-blue-100 rounded-t-lg">
                            <th className="px-6 py-4 text-gray-700 font-semibold">No.</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold">ID</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold">Name</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold">Phone</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold">Date</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold">Time</th>
                            <th className="px-6 py-4 text-gray-700 font-semibold text-center">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                                No data available
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`w-8 h-8 rounded-full ${
                                    currentPage === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                } text-sm font-semibold hover:bg-blue-600`}
                                onClick={() => handlePageChange(i + 1)}
                                aria-label={`Go to page ${i + 1}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patients Popup */}
            {isPopupOpen && <Patients isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />}
        </div>
    );
};

export default TableList;
