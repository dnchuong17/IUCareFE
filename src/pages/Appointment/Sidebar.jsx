import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets.js";
import { FaCalendarAlt, FaUserMd, FaUser, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa";
import { HiHome } from 'react-icons/hi2';
import moment from 'moment';
import React, { useState } from 'react';
const Sidebar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const getNext30Days = () => {
        const dates = [];
        const today = moment();

        for (let i = 0; i < 30; i++) {
            const date = today.clone().add(i, 'days');
            dates.push({
                day: date.format('ddd'), // e.g., 'Tue'
                date: date.date(),
                isToday: i === 0
            });
        }
        return dates;
    };

    const monthDates = getNext30Days();
    return (
        <div className="flex">
            <div className="fixed left-0 top-0 h-full w-1/5  md:w-1/5.5 bg-white p-4 overflow-y-auto ">
                <img
                    //make it static, not being scrollable
                    src={assets.sidebar_logo}
                    alt="Sidebar Logo"
                    className="w-full h-auto mb-4 md:p-1 md:top-0 hover:scale-105 border border-gray-300 rounded transition-transform duration-300 top-4 left-4"
                />
                <div className="flex flex-col space-y-5 mb-12 "> {/* Spacer div to push content to the bottom */}
                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300'>
                        <HiHome className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
                        <Link to="/appointment" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-left ml-10 mr-10 text-lg md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Home</button>
                        </Link>
                    </div>

                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300'>
                        <FaUserMd className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />

                        <Link to="/page3" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-left ml-5 text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Appointment</button>
                        </Link>
                    </div>

                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300'>
                        <FaCalendarAlt className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
                        <Link to="/tableList" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-left ml-10 text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Patient</button>
                        </Link>
                    </div>
                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300'>
                        <FaUser className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />

                        <Link to="/page4" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-left ml-10 text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Profile</button>
                        </Link>
                    </div>
                </div>
                {/* create a grey line divide Profile and Logout */}
                <div className="border-b-2 border-gray-100"></div>
                <div className="mb-4 flex flex-col space-y-5 mb-12">
                    <div className="group flexCenter space-x-1 bg-white-500 text-grey-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300">
                        <Link to="/page3" className="flex items-center space-x-1 w-full">
                            <FaSignOutAlt className="text-blue-300 group-hover:text-orange-700 ml-5" />

                            <button className="w-full text-lg  md:text-base lg:text-xl p-2 md:p-1 lg:p-3">Logout</button>
                        </Link>
                    </div>

                </div>

            </div>








        </div >


    );
}

export default Sidebar;