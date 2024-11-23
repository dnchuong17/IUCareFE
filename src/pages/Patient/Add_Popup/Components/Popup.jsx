import React from "react";

const Popup = ({ isOpen, onClose, onSave, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-[1200px] h-[80%] p-8 relative overflow-y-auto flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-2xl font-semibold"
                >
                    ✖
                </button>

                {/* Popup Content */}
                <div className="flex-grow">
                    <div className="text-gray-700 text-lg font-light">{children}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-base font-medium shadow hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium shadow hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
