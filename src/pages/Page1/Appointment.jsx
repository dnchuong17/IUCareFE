import React, { useState } from 'react';

const Appointment = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
        <div className="fixed right-11 bottom-5 rounded-xl shadow-md border border-darkblue-800 h-1/2 w-4/6 bg-white md:w-3/4 md:h-3/5 z-20 p-4">
            <button className="absolute top-2 right-2 w-16 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors duration-300" onClick={toggleModal}>
                +
            </button>
            {isModalVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-300 p-4 rounded-lg">
                                <h2 className="text-xl font-bold text-gray-700">BOOKING APPOINTMENT</h2>
                            </div>
                            <div className="bg-blue-200 p-4 rounded-lg text-gray-700">
                                <input type="text" placeholder="Search patient information" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div className="bg-blue-200 p-4 rounded-lg text-gray-700">
                                <label>Time Selection</label>
                                <input type="time" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div className="bg-blue-200 p-4 rounded-lg text-gray-700">
                                <label>Date Selection</label>
                                <input type="date" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div className="bg-blue-200 p-4 rounded-lg flex justify-end">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300" onClick={toggleModal}>
                                    Close
                                </button>
                                <button className="bg-blue-600 text-white px-3 py-2 p-2 rounded-md hover:bg-blue-900 transition-colors duration-300">
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Appointment;