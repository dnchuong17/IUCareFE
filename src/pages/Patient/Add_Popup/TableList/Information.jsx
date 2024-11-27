import React from "react";

const Information = () => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">New Patient</h2>
            <form className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">First Name *</label>
                        <input
                            type="text"
                            placeholder="Tran"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Last Name *</label>
                        <input
                            type="text"
                            placeholder="Thi Diem"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Date of Birth *</label>
                        <input
                            type="date"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Sex *</label>
                        <select
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                            defaultValue="Male"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Citizen Identity Card *</label>
                        <input
                            type="text"
                            placeholder="0123456789"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input
                            type="text"
                            placeholder="0334040072"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Address *</label>
                    <input
                        type="text"
                        placeholder="International University, Di An, Binh Duong"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="tranthidiem@gmail.com"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Health Insurance Card</label>
                        <input
                            type="text"
                            placeholder="HS0123456789"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Information;
