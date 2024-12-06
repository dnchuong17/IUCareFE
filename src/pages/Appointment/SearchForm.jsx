import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import InformationForm from "./InformationForm";
import { Api } from "../../utils/api.ts";
import { toast } from "react-toastify";

const SearchForm = ({ isOpen, onClose, onAppointmentCreated }) => {
    const [doctorId, setDoctorId] = useState(null); // Store the logged-in doctor's ID
    const [isInfoFormOpen, setIsInfoFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [searchResults, setSearchResults] = useState([]); // List of search results
    const [selectedPatient, setSelectedPatient] = useState(null); // Selected patient
    const [appointmentDateTime, setAppointmentDateTime] = useState(""); // Appointment date and time
    const [message, setMessage] = useState(""); // Error or success message
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const api = new Api(); // API instance

    useEffect(() => {
        // Fetch doctor ID after login success
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
                setDoctorId(doctorId);
            } catch (error) {
                console.error("Error fetching doctor information:", error.response?.data || error.message);
                toast.error("Failed to fetch doctor information.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };
        fetchDoctorInfo();
    }, [api]);

    const handleSearchChange = async (e) => {
        const searchTerm = e.target.value.trim();
        setSearchTerm(searchTerm);

        if (searchTerm.length > 0) {
            setIsLoading(true);
            try {
                const results = await api.searchPatient(searchTerm);
                if (results && Array.isArray(results.data)) {
                    const patients = results.data.map((result) => ({
                        studentId: result.studentId,
                        patientName: result.patientName,
                        patientId: result.patientId, // Add patientId from search results
                    }));
                    setSearchResults(patients);
                } else {
                    setMessage("Unexpected response format.");
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Error searching for patients. Search term:", searchTerm, "Error:", error.response?.data || error.message);
                setMessage("Error searching for patients. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        } else {
            setSearchResults([]);
            setMessage("");
        }
    };

    const handleSelectPatient = (id, name, patientId) => {
        setSelectedPatient({ studentId: id, patientName: name, patientId });
        setSearchTerm(id);
        setSearchResults([]);
        setMessage("");
    };

    const handleCreateAppointment = async () => {
        if (!selectedPatient || !appointmentDateTime) {
            setMessage("Please fill in all fields before creating an appointment.");
            return;
        }

        const appointmentRequest = {
            doctorId,
            patientId: selectedPatient.patientId,
            time: appointmentDateTime,
        };

        try {
            setIsLoading(true);
            await api.createAppointment(appointmentRequest);
            setMessage("Appointment created successfully.");
            setSelectedPatient(null);
            setAppointmentDateTime("");
            onAppointmentCreated({
                patientName: selectedPatient.patientName,
                studentId: selectedPatient.studentId,
                time: appointmentDateTime,
            });
        } catch (error) {
            console.error("Error creating appointment:", error);
            setMessage("Failed to create appointment. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen && !isInfoFormOpen) return null;

    return (
        <>
            {/* Modal Popup */}
            {isOpen && !isInfoFormOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Search Patient</h2>

                        {/* Search */}
                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Enter student ID..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => setIsInfoFormOpen(true)}
                                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                +
                            </button>
                        </div>

                        {isLoading && <p className="text-blue-500 mt-2">Loading...</p>}

                        {message && <p className="text-red-500 mt-2">{message}</p>}

                        {/* Results */}
                        {searchResults.length > 0 && (
                            <ul className="mt-2 border rounded-md shadow-md max-h-48 overflow-y-auto">
                                {searchResults.map((patient) => (
                                    <li
                                        key={patient.studentId}
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                        onClick={() =>
                                            handleSelectPatient(patient.studentId, patient.patientName, patient.patientId)
                                        }
                                    >
                                        {patient.patientName} ({patient.studentId})
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Selected Patient Info */}
                        {selectedPatient && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Selected Patient:</h3>
                                <p>{selectedPatient.patientName}</p>
                                <p>Student ID: {selectedPatient.studentId}</p>

                                {/* Appointment Date and Time */}
                                <label
                                    htmlFor="appointmentDateTime"
                                    className="block mt-4 text-sm font-medium"
                                >
                                    Appointment Date and Time:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="appointmentDateTime"
                                    value={appointmentDateTime}
                                    onChange={(e) => setAppointmentDateTime(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        {/* Create Appointment Button */}
                        <button
                            onClick={handleCreateAppointment}
                            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Create Appointment
                        </button>
                    </div>
                </div>
            )}

            {/* Information Popup */}
            <InformationForm
                isOpen={isInfoFormOpen}
                onClose={() => setIsInfoFormOpen(false)}
            />
        </>
    );
};

export default SearchForm;