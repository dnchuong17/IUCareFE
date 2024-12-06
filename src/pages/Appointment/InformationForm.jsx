import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Api } from "../../utils/api.ts";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InformationForm = ({ isOpen, onClose }) => {
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

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { name, address, major, phone, studentId } = info;
        if (!name || !address || !major || !phone || !studentId) {
            toast.error("Please fill in all required fields.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            console.log("Submitting info:", info);
            const response = await api.createPatient(info);

            if (response) {
                toast.success("Information saved successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => navigate("/page1"),
                });
            } else {
                toast.error(
                    "Failed to save information. API did not return a response.",
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }
                );
            }
        } catch (error) {
            console.error("Error saving information:", error?.response?.data || error.message);
            toast.error(
                error?.response?.data?.message || "Failed to save information. Please try again.",
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                    {/* Close Button with X Icon */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes className="text-xl" />
                    </button>

                    <h2 className="text-xl font-bold mb-4">Student Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={info.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Student ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="studentId">
                                Student ID
                            </label>
                            <input
                                type="text"
                                name="studentId"
                                value={info.studentId}
                                onChange={handleChange}
                                placeholder="Enter student ID"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Major */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="major">
                                Major
                            </label>
                            <input
                                type="text"
                                name="major"
                                value={info.major}
                                onChange={handleChange}
                                placeholder="Enter major"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={info.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={info.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Allergy */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="allergy">
                                Allergy
                            </label>
                            <textarea
                                name="allergy"
                                value={info.allergy}
                                onChange={handleChange}
                                placeholder="Enter allergy info"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                rows="5"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "hover:bg-blue-600"
                                }`}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Toast Container to show notifications */}
            <ToastContainer />
        </>
    );
};

// Add prop-types for validation
InformationForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default InformationForm;
