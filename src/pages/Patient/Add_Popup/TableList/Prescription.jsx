import React from "react";

const Prescription = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Prescription</h2>
            <form className="grid gap-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Medicine Name *</label>
                    <input
                        type="text"
                        placeholder="Enter the medicine name..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Dosage *</label>
                    <input
                        type="text"
                        placeholder="Enter the dosage..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Usage Instructions *</label>
                    <textarea
                        placeholder="Enter the usage instructions..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default Prescription;
