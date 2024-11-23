import React from "react";

const Result = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Result</h2>
            <form className="grid gap-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Diagnosis Result *</label>
                    <textarea
                        placeholder="Enter diagnosis result..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Consultation and Guidance *</label>
                    <textarea
                        placeholder="Enter consultation and guidance..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default Result;
