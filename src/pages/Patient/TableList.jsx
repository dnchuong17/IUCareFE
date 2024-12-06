import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import Sidebar from "../../components/Sidebar.jsx";

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

      {/* Patient List Section */}
      <div className="flex-grow flex justify-center items-start py-28 px-4">
        <div className="w-full max-w-5xl bg-white border-l-4 border-blue-500 rounded-lg shadow-lg p-10">
          {/* Header: Patient Count */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 p-4 rounded-full flex items-center justify-center">
                <IoPerson className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Quantifiers
                </h1>
                <p className="text-gray-500 text-base">{patientsCount}</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center mb-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                aria-label="Search patients"
              />
            </div>
          </div>

          {/* Table List */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    No.
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    Sick
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    Treatment
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base whitespace-nowrap">
                    Time
                  </th>
                  <th className="px-6 py-4 text-gray-700 font-semibold text-base text-center whitespace-nowrap">
                    View Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500 italic text-base"
                  >
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center p-6 border-t border-gray-200 mt-8">
            <nav className="flex space-x-3" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-full text-base font-semibold transition-colors duration-200
                    ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  onClick={() => handlePageChange(i + 1)}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
