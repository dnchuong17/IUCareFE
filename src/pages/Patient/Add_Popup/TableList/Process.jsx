import React from "react";

const Process = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Process</h2>
            <form className="grid gap-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Start Date *</label>
                    <input
                        type="date"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Disease Progression *</label>
                    <textarea
                        placeholder="Enter disease progression..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Update Progress *</label>
                    <textarea
                        placeholder="Enter progress update..."
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};

export default Process;
