import React, { useState } from "react";
import { Api } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const Information = () => {
    const api = new Api();
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        name: "",
        address: "",
        major: "",
        phone: "",
        studentId: "",
        allergy: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await api.createPatient(info);

            if (response) {
                setSuccessMessage("Patient information saved successfully!");
            } else {
                setErrorMessage("Failed to save information. API did not return a response.");
            }
        } catch (error) {
            console.error("Error saving information:", error);
            setErrorMessage(
                error.response?.data?.message || "Failed to save information. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Patient Information Form
                </h1>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 relative">
                        {/* Close */}
                        <FiX
                            className="absolute top-2 right-2 text-green-700 hover:text-green-900 cursor-pointer"
                            size={20}
                            onClick={() => setSuccessMessage("")}
                        />
                        <p className="text-center mb-4">{successMessage}</p>
                        <div className="text-center">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={() => navigate("/page1")}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 relative">
                        <FiX
                            className="absolute top-2 right-2 text-red-700 hover:text-red-900 cursor-pointer"
                            size={20}
                            onClick={() => setErrorMessage("")}
                        />
                        <p className="text-center">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={info.name}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    {/* Student ID */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Student ID</label>
                        <input
                            type="text"
                            name="studentId"
                            value={info.studentId}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                            placeholder="Enter student ID"
                            required
                        />
                    </div>

                    {/* Major */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Major</label>
                        <input
                            type="text"
                            name="major"
                            value={info.major}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                            placeholder="Enter major"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={info.phone}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={info.address}
                            onChange={handleChange}
                            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
                            placeholder="Enter address"
                            required
                        />
                    </div>

                    {/* Allergy */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Allergy</label>
                        <textarea
                            name="allergy"
                            value={info.allergy}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter allergy details"
                            rows="5"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-md text-white font-bold text-lg ${
                                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Information;
