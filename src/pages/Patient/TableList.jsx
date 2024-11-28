import React, { useState } from "react";
import { FiCheckCircle, FiSearch, FiFilter, FiSettings } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import Sidebar from "../Page1/Sidebar.jsx";

const TableList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsCount, setPatientsCount] = useState(0);
    const totalPages = 4;


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/5">
                <Sidebar />
            </div>

            {/* Patient */}
            <div className="flex-grow flex justify-center items-start py-10">
                <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-10">
                    {/* Adding */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center space-x-4">
                            <span className="bg-gray-200 p-4 rounded-full flex items-center justify-center">
                                <IoPerson className="h-8 w-8 text-blue-600" />
                            </span>
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-700">Patients</h1>
                                <p className="text-gray-500 text-lg">{patientsCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="mt-6">
                        {/* Searching */}
                        <div className="p-5 flex justify-between items-center bg-gray-50 rounded-lg mb-6 shadow-sm">
                            <div className="relative w-full">
                                <FiSearch
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"/>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    aria-label="Search patients"
                                />
                            </div>

                        </div>

                        {/* Table list */}
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-blue-100 rounded-t-lg">
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">No.</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">Doctor</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">Sick</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">Treatment</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">Date</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg">Time</th>
                                    <th className="px-8 py-5 text-gray-700 font-semibold text-lg text-center">
                                        View Details
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-500 italic text-lg">
                                        No data available
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pageination */}
                        <div className="flex justify-center items-center p-6 border-t border-gray-200 mt-6">
                            <div className="flex space-x-4">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`w-12 h-12 rounded-full ${
                                            currentPage === i + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        } text-lg font-semibold hover:bg-blue-600`}
                                        onClick={() => handlePageChange(i + 1)}
                                        aria-label={`Go to page ${i + 1}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TableList;
