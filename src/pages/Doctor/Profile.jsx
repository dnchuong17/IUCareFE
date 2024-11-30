import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Api } from "../../utils/api.ts"; // Import API class

const Information = () => {
    const [info, setInfo] = useState({
        doctor_name: "",
        password: "********",
        doctor_address: "",
        doctor_phone: "",
        department_name: "",
        department_number: "",
    });
    const [editingField, setEditingField] = useState("");
    const [doctorId] = useState(1); // ID bác sĩ (cố định hoặc lấy từ context/router)
    const api = new Api(); // Tạo instance API

    // Fetch doctor information
    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await api.getAxiosObject().get(`/doctor/${doctorId}`);
                setInfo(response.data);
            } catch (error) {
                console.error("Error fetching doctor information:", error.response?.data || error.message);
            }
        };

        fetchDoctorInfo();
    }, [doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                password: info.password || undefined,
                address: info.doctor_address,
                phone: info.doctor_phone,
            };

            await api.getAxiosObject().patch(`/doctor/change_information/${doctorId}`, updatedData);
            alert("Information updated successfully!");
            setEditingField("");
        } catch (error) {
            console.error("Error updating information:", error.response?.data || error.message);
            alert("Failed to update information.");
        }
    };

    const handleSaveAll = async () => {
        await handleSave();
        alert("All information saved successfully!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Doctor Profile
                </h1>
                <form className="space-y-6">
                    {/* Full Name and Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="text-lg text-gray-800">{info.doctor_name}</div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="flex items-center gap-4 mt-2">
                                {editingField === "password" ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={info.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                                    />
                                ) : (
                                    <div className="text-lg text-gray-800">********</div>
                                )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        editingField === "password" ? handleSave() : handleEdit("password")
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Address and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Address
                            </label>
                            <div className="flex items-center gap-4 mt-2">
                                {editingField === "doctor_address" ? (
                                    <input
                                        type="text"
                                        name="doctor_address"
                                        value={info.doctor_address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                                    />
                                ) : (
                                    <div className="text-lg text-gray-800">{info.doctor_address}</div>
                                )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        editingField === "doctor_address" ? handleSave() : handleEdit("doctor_address")
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Phone
                            </label>
                            <div className="flex items-center gap-4 mt-2">
                                {editingField === "doctor_phone" ? (
                                    <input
                                        type="text"
                                        name="doctor_phone"
                                        value={info.doctor_phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                                    />
                                ) : (
                                    <div className="text-lg text-gray-800">{info.doctor_phone}</div>
                                )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        editingField === "doctor_phone" ? handleSave() : handleEdit("doctor_phone")
                                    }
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Department Name and Department Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Department Name
                            </label>
                            <div className="text-lg text-gray-800 mt-2">{info.department_name}</div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">
                                Department Number
                            </label>
                            <div className="text-lg text-gray-800 mt-2">{info.department_number}</div>
                        </div>
                    </div>

                    {/* Save All Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={handleSaveAll}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-bold transition-transform transform hover:scale-105"
                        >
                            Save All
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Information;
