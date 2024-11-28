import React, { useState } from "react";
import Sidebar from "../../Page1/Sidebar.jsx";
import Information from "./Information.jsx";
import Diagnosis from "./Diagnosis.jsx";

const MedicalRecord = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [formData, setFormData] = useState({
        patientName: "",
        doctorName: "",
        sickDetails: "",
        treatmentDetails: "",
        prescriptionDetails: "",
    });

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { patientName, doctorName, sickDetails, treatmentDetails, prescriptionDetails } =
            formData;

        if (
            patientName.trim() &&
            doctorName.trim() &&
            sickDetails.trim() &&
            treatmentDetails.trim() &&
            prescriptionDetails.trim()
        ) {
            alert("Medical Record created successfully!");
        } else {
            alert("Fail. Please check details.");
        }
    };

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w-1/5 bg-white shadow-lg">
                <Sidebar />
            </div>

            <div className="flex-grow p-8 space-y-6">

                {/* Medical Record*/}
                <div className="bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-white mb-6">Medical Record</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-4 items-end">

                            {/* Patient Name */}
                            <div className="flex flex-col w-1/2">
                                <label className="text-blue-950 font-medium text-xl">Patient Name</label>
                                <input
                                    type="text"
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    className="border border-blue-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter patient name"
                                />
                            </div>

                            {/* Doctor Name */}
                            <div className="flex flex-col w-1/2">
                                <label className="text-blue-900 font-medium text-xl">Doctor Name</label>
                                <input
                                    type="text"
                                    name="doctorName"
                                    value={formData.doctorName}
                                    onChange={handleChange}
                                    className="border border-blue-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter doctor name"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="bg-gradient-to-b from-blue-600 to-blue-400 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold self-end"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Information */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Left */}
                    <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div>
                            <label className="text-blue-700 font-medium text-xl">Sick</label>
                            <textarea
                                name="sickDetails"
                                value={formData.sickDetails}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter illness details"
                                rows="4"
                            />
                        </div>
                        <div>
                            <label className="text-blue-700 font-medium text-xl">Treatment</label>
                            <textarea
                                name="treatmentDetails"
                                value={formData.treatmentDetails}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter treatment details"
                                rows="4"
                            />
                        </div>

                        <div>
                            <label className="text-blue-700 font-medium text-xl">Prescription</label>
                            <textarea
                                name="prescriptionDetails"
                                value={formData.prescriptionDetails}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="8"
                                placeholder="Enter prescription details"
                            ></textarea>
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
                        style={{
                            maxHeight: "100vh",
                            overflowY: "auto",
                        }}
                    >
                        {/* Patient Information */}
                        <div>
                            <button
                                className="bg-blue-100 text-blue-700 rounded-lg p-4 shadow w-full text-left"
                                onClick={() => toggleSection("patientInfo")}
                            >
                                <h2 className="font-medium text-xl">Patient Information</h2>
                            </button>
                            {activeSection === "patientInfo" && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
                                    <Information onClose={() => toggleSection(null)} />
                                </div>
                            )}
                        </div>

                        {/* Diagnosis */}
                        <div>
                            <button
                                className="bg-blue-100 text-blue-700 rounded-lg p-4 shadow w-full text-left"
                                onClick={() => toggleSection("diagnosis")}
                            >
                                <h2 className="font-medium text-xl">Diagnosis</h2>
                            </button>
                            {activeSection === "diagnosis" && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
                                    <Diagnosis onClose={() => toggleSection(null)} />
                                </div>
                            )}
                        </div>

                        {/* Latest Records */}
                        <div>
                            <button
                                className="bg-blue-100 text-blue-700 rounded-lg p-4 shadow w-full text-left"
                                onClick={() => toggleSection("latestRecords")}
                            >
                                <h2 className="font-medium text-xl">Latest Records</h2>
                            </button>
                            {activeSection === "latestRecords" && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
                                    <p>No records found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecord;
