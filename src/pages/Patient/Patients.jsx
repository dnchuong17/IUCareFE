import React, { useState } from "react";
import Popup from "./Add_Popup/Components/Popup.jsx";
import Information from "./Add_Popup/TableList/Information.jsx";
import MedicalRecord from "./Add_Popup/TableList/MedicalRecord.jsx";
import Prescription from "./Add_Popup/TableList/Prescription.jsx";
import Process from "./Add_Popup/TableList/Process.jsx";
import Result from "./Add_Popup/TableList/Result.jsx";

const Patients = ({ isPopupOpen, setIsPopupOpen }) => {
    const [activeTab, setActiveTab] = useState("information");

    const renderContent = () => {
        switch (activeTab) {
            case "information":
                return <Information />;
            case "medicalRecord":
                return <MedicalRecord />;
            case "prescription":
                return <Prescription />;
            case "process":
                return <Process />;
            case "result":
                return <Result />;
            default:
                return <Information />;
        }
    };

    return (
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <div>
                <div className="flex space-x-4 border-b mb-4">
                    <button
                        onClick={() => setActiveTab("information")}
                        className={`py-2 px-4 font-semibold ${
                            activeTab === "information" ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        Information
                    </button>
                    <button
                        onClick={() => setActiveTab("medicalRecord")}
                        className={`py-2 px-4 font-semibold ${
                            activeTab === "medicalRecord" ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        Medical Record
                    </button>
                    <button
                        onClick={() => setActiveTab("process")}
                        className={`py-2 px-4 font-semibold ${
                            activeTab === "process" ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        Process
                    </button>
                    <button
                        onClick={() => setActiveTab("result")}
                        className={`py-2 px-4 font-semibold ${
                            activeTab === "result" ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        Result
                    </button>
                    <button
                        onClick={() => setActiveTab("prescription")}
                        className={`py-2 px-4 font-semibold ${
                            activeTab === "prescription" ? "text-white bg-blue-500" : ""
                        }`}
                    >
                        Prescription
                    </button>
                </div>
                {renderContent()}
            </div>
        </Popup>
    );
};

export default Patients;
