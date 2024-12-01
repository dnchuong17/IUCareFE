import React, { useState } from "react";

const Information = () => {
    const [info, setInfo] = useState({
        fullName: "",
        studentID: "",
        major: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
            
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = {
            fullName: info.fullName,
            studentID: info.studentID,
            phone: info.phone,
            department: info.department,
            address: info.address,
        };
        const existingData = JSON.parse(localStorage.getItem('students')) || [];
        existingData.push(studentData);
        localStorage.setItem('students', JSON.stringify(existingData));
        alert('Data saved successfully!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-2xl p-12">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
                    Information Form
                </h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Full Name */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={info.fullName}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl p-4"
                            placeholder="Enter full name"
                        />
                    </div>

                    {/* Student ID */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Student ID
                        </label>
                        <input
                            type="text"
                            name="studentID"
                            value={info.studentID}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl p-4"
                            placeholder="Enter student ID"
                        />
                    </div>

                    {/* Major */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Major
                        </label>
                        <input
                            type="text"
                            name="major"
                            value={info.major}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl p-4"
                            placeholder="Enter major"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={info.phone}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl p-4"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={info.address}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xl p-4"
                            placeholder="Enter address"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-12 py-4 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 text-2xl font-bold transition-transform transform hover:scale-105"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Information;
