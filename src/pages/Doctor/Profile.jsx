import React, { useState, useEffect } from "react";
import { Api } from "../../utils/api.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Page1/Sidebar.jsx";
import { HiOutlinePencilAlt } from "react-icons/hi";

const Profile = () => {
    const [info, setInfo] = useState({
        doctor_id: "",
        doctor_name: "",
        password: "********",
        doctor_address: "",
        doctor_phone: "",
        department_name: "",
        department_number: "",
    });
    const [editField, setEditField] = useState(null);
    const api = new Api();

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            const account = localStorage.getItem("account");
            if (!account) {
                toast.error("Account is missing. Please log in again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                return;
            }

            try {
                const doctorData = await api.getDoctorByAccount(account);
                const doctorId = doctorData?.doctor_id;
                if (!doctorId) {
                    toast.error("Doctor ID is missing from server response.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    return;
                }

                const detailedInfo = await api.getDoctorById(doctorId);
                const infoWithId = { ...detailedInfo, doctor_id: doctorId };
                setInfo(infoWithId);
                localStorage.setItem("doctorInfo", JSON.stringify(infoWithId));
            } catch (error) {
                console.error("Error fetching doctor information:", error.response?.data || error.message);
                toast.error("Failed to fetch doctor information.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };

        fetchDoctorInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEdit = (field) => {
        setEditField(field);
    };

    const handleSave = async () => {
        const updatedData = {
            password: info.password !== "********" ? info.password : undefined,
            doctor_address: info.doctor_address,
            doctor_phone: info.doctor_phone,
        };

        const filteredData = Object.entries(updatedData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});

        if (Object.keys(filteredData).length === 0) {
            toast.info("No changes to save!", { position: "top-right", autoClose: 3000 });
            return;
        }

        try {
            console.log("Payload being sent:", filteredData);
            await api.updateDoctorInfo(info.doctor_id, filteredData);

            setInfo((prevState) => ({
                ...prevState,
                ...filteredData,
                password: "********",
            }));

            localStorage.setItem("doctorInfo", JSON.stringify({ ...info, ...filteredData }));

            toast.success("Information updated successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error updating information:", error.response?.data || error.message);
            toast.error(`Failed to update information. Error: ${error.response?.data?.message || error.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-white shadow-lg">
                <Sidebar />
            </div>
            {/* Main Content */}
            <div className="w-4/5 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Doctor Profile</h1>
                    <form className="space-y-6">
                        {/* Full Name and Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="doctor_name"
                                        value={info.doctor_name}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={info.password}
                                        onChange={handleChange}
                                        disabled={editField !== "password"}
                                        className={`w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3 ${
                                            editField !== "password" ? "bg-gray-100 cursor-not-allowed" : ""
                                        }`}
                                    />
                                    <HiOutlinePencilAlt
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-gray-400 cursor-pointer"
                                        onClick={() => handleEdit("password")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address and Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Address</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="doctor_address"
                                        value={info.doctor_address}
                                        onChange={handleChange}
                                        disabled={editField !== "doctor_address"}
                                        className={`w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3 ${
                                            editField !== "doctor_address" ? "bg-gray-100 cursor-not-allowed" : ""
                                        }`}
                                    />
                                    <HiOutlinePencilAlt
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-gray-400 cursor-pointer"
                                        onClick={() => handleEdit("doctor_address")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Phone</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="doctor_phone"
                                        value={info.doctor_phone}
                                        onChange={handleChange}
                                        disabled={editField !== "doctor_phone"}
                                        className={`w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3 ${
                                            editField !== "doctor_phone" ? "bg-gray-100 cursor-not-allowed" : ""
                                        }`}
                                    />
                                    <HiOutlinePencilAlt
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-gray-400 cursor-pointer"
                                        onClick={() => handleEdit("doctor_phone")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Department Name and Department Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Department Name</label>
                                <input
                                    type="text"
                                    name="department_name"
                                    value={info.department_name}
                                    disabled
                                    className="w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-gray-700">Department Number</label>
                                <input
                                    type="text"
                                    name="department_number"
                                    value={info.department_number}
                                    disabled
                                    className="w-full h-12 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg pl-3"
                                />
                            </div>
                        </div>

                        {/* Save */}
                        <div className="text-center mt-8">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
