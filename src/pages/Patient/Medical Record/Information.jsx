import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Information = ({ onClose }) => {
    const [patientInfo, setPatientInfo] = useState({
        fullName: "",
        student_id: "",
        address: "",
        major: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check details
        const { fullName, student_id, address, major, phone } = patientInfo;
        if (
            fullName.trim() &&
            student_id.trim() &&
            address.trim() &&
            major.trim() &&
            phone.trim()
        ) {
            alert("Patient information submitted successfully!");
        } else {
            alert("Fail. Please check details.");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative">

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <AiOutlineClose className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">Patient Information</h2>

            {/* Information */}
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div>
                    <label className="text-gray-600 font-medium">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        value={patientInfo.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                    />
                </div>

                {/* Student ID */}
                <div>
                    <label className="text-gray-600 font-medium">Student ID</label>
                    <input
                        name="student_id"
                        type="text"
                        value={patientInfo.student_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Student ID"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="text-gray-600 font-medium">Address</label>
                    <input
                        name="address"
                        type="text"
                        value={patientInfo.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter address"
                    />
                </div>

                {/* Major */}
                <div>
                    <label className="text-gray-600 font-medium">Major</label>
                    <input
                        name="major"
                        type="text"
                        value={patientInfo.major}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter major"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="text-gray-600 font-medium">Phone</label>
                    <input
                        name="phone"
                        type="text"
                        value={patientInfo.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                    />
                </div>

                {/* Submit  */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Information;
