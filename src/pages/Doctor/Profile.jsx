import React, { useState, useEffect } from "react";
import { Api } from "../../utils/api.ts";

const Information = () => {
    const [info, setInfo] = useState({
        doctor_id: "",
        doctor_name: "",
        password: "********",
        doctor_address: "",
        doctor_phone: "",
        department_name: "",
        department_number: "",
    });
    const api = new Api();

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            const account = localStorage.getItem("account");
            if (!account) {
                alert("Account is missing. Please log in again.");
                return;
            }

            try {
                const doctorData = await api.getDoctorByAccount(account);
                const doctorId = doctorData?.doctor_id;
                if (!doctorId) {
                    alert("Doctor ID is missing from server response.");
                    return;
                }

                const detailedInfo = await api.getDoctorById(doctorId);
                const infoWithId = { ...detailedInfo, doctor_id: doctorId };
                setInfo(infoWithId);
                localStorage.setItem("doctorInfo", JSON.stringify(infoWithId));
            } catch (error) {
                console.error("Error fetching doctor information:", error.response?.data || error.message);
                alert("Failed to fetch doctor information.");
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

    const handleSave = async () => {
        // To payload with updated information
        const updatedData = {
            password: info.password !== "********" ? info.password : undefined,
            doctor_address: info.doctor_address,
            doctor_phone: info.doctor_phone,
        };

        // Filter out fields that don't need to be updated
        const filteredData = Object.entries(updatedData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});

        // If there's nothing to update, alert the user
        if (Object.keys(filteredData).length === 0) {
            alert("No changes to save!");
            return;
        }

        try {
            console.log("Payload being sent:", filteredData);
            await api.updateDoctorInfo(info.doctor_id, filteredData);

            // Update state and localStorage upon successful update
            setInfo((prevState) => ({
                ...prevState,
                ...filteredData,
                password: "********", // Reset password
            }));

            localStorage.setItem("doctorInfo", JSON.stringify({ ...info, ...filteredData }));

            alert("Information updated successfully!");
        } catch (error) {
            console.error("Error updating information:", error.response?.data || error.message);
            alert(`Failed to update information. Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Doctor Profile</h1>
                <form className="space-y-6">
                    {/* Full Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="doctor_name"
                                value={info.doctor_name}
                                onChange={handleChange}
                                disabled
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3 mt-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={info.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3 mt-2"
                            />
                        </div>
                    </div>

                    {/* Address and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Address</label>
                            <input
                                type="text"
                                name="doctor_address"
                                value={info.doctor_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3 mt-2"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="doctor_phone"
                                value={info.doctor_phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3 mt-2"
                            />
                        </div>
                    </div>

                    {/* Department Name and Department Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Department Name</label>
                            <div className="text-lg text-gray-800 mt-2">{info.department_name}</div>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Department Number</label>
                            <div className="text-lg text-gray-800 mt-2">{info.department_number}</div>
                        </div>
                    </div>

                    {/* Save */}
                    <div className="text-center mt-8">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                        >
                            Save All Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Information;
