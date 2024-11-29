import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";


const Diagnosis = ({ onClose }) => {
    const [diagnosisInfo, setDiagnosisInfo] = useState({
        diagnosis: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiagnosisInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (diagnosisInfo.diagnosis.trim()) {
            console.log("Diagnosis Submitted:", diagnosisInfo);
            alert("Diagnosis information submitted successfully!");
        } else {
            alert("Fail. Please check details.");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative">
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <AiOutlineClose className="w-6 h-6"/>
            </button>

            <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Diagnosis */}
                <div>
                    <textarea
                        name="diagnosis"
                        value={diagnosisInfo.diagnosis}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter diagnosis details"
                        rows="5"
                    ></textarea>
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Diagnosis;
