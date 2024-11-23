import React from "react";

const MedicalRecord = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Medical Record</h2>
            <form className="grid gap-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Reason for Visit *</label>
                    <textarea
                        placeholder="Enter the reason for the visit..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Medical History *</label>
                    <textarea
                        placeholder="Enter the medical history..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Preliminary Diagnosis *</label>
                    <textarea
                        placeholder="Enter the preliminary diagnosis..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default MedicalRecord;
