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
            <div className="fixed left-0 top-0 h-full w-1/4  md:w-1/5 bg-white p-4 overflow-y-auto ">
                <img
                    //make it static, not being scrollable
                    src={assets.sidebar_logo}
                    alt="Sidebar Logo"
                    className="w-full h-auto mb-4 hover:opacity-75 md:p-1 md:top-0 hover:scale-105 border border-gray-300 rounded transition-transform duration-300 top-4 left-4"
                />
                <div className="flex flex-col space-y-5 mb-12 "> {/* Spacer div to push content to the bottom */}
                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300'>
                        <HiHome className="text-blue-300 group-hover:text-orange-700 ml-5" />
                        <Link to="/" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Home</button>
                        </Link>
                    </div>
                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3  hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300'>
                        <FaCalendarAlt className="text-blue-300 group-hover:text-orange-700 ml-5" />

                        <Link to="/page2" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Schedule</button>

                        </Link>
                    </div>

                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300'>
                        <FaUserMd className="text-blue-300 group-hover:text-orange-700 ml-5" />

                        <Link to="/page1" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Appointment</button>
                        </Link>
                    </div>

                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300'>
                        <FaUserAstronaut className="text-blue-300 group-hover:text-orange-700 ml-5" />
                        <Link to="/tableList" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Patient</button>
                        </Link>
                    </div>
                    <div className='group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300'>
                        <FaUser className="text-blue-300 group-hover:text-orange-700 ml-5" />

                        <Link to="/page4" className="flex items-center space-x-1 w-full">
                            <button className="w-full text-lg  md:text-base lg:text-lg p-2 md:p-1 lg:p-3">Profile</button>
                        </Link>
                    </div>
                </div>
                {/* create a grey line divide Profile and Logout */}
                <div className="border-b-2 border-gray-100"></div>
                <div className="mb-4 flex flex-col space-y-5 mb-12">
                    <div className="group flexCenter space-x-1 bg-white-500 text-grey-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300">
                        <Link to="/page3" className="flex items-center space-x-1 w-full">
                            <FaSignOutAlt className="text-blue-300 group-hover:text-orange-700 ml-5" />

                            <button className="w-full text-lg  md:text-base lg:text-xl p-2 md:p-1 lg:p-3">Logout</button>
                        </Link>
                    </div>

                </div>

            </div>
            {/* create a big box wjth a blue background, 3/5 width of the screen, and a height of 1/4 of the screen
            // this box next to the sidebar */}
            {/* Create a light blue border surrounded big box */}


{/*            <div className="fixed right-11 top-5 rounded-xl shadow-md border border-lightblue-400 h-1/4 w-4/6 bg-blue-500 md:w-3/4 md:h-3/10 z-20 p-4">*/}
{/*                <div className="flex justify-between space-x-1 bg-white-500 text-grey-100 p-4 rounded-lg mt-5 cursor-pointer px-3 ">*/}
{/*                    /!* create a white text "Our Appointment" this text at the right side of big box *!/*/}
{/*                    <div className="absolute top-4 left-8 text-white text-2xl width-24 height\shadow-sm">Our Appointment</div>*/}
{/*                    <div className="overflow-x-auto h-full"> /!* Scrollable container *!/*/}
{/*                        <div className="flex space-x-4">*/}
{/*                            /!* {daysOfWeek.map((day, index) => (*/}
{/*                                <button key={index} className="flex flex-col mt-3 items-center p-5 w-35 h-35 bg-gray-800 bg-opacity-50 text-white p-5 w-40 h-50 rounded-lg shadow-md hover:bg-orange-400 transition-colors duration-300">*/}
{/*                                    <div className="text-lg">{day}</div>*/}
{/*                                    <div className="text-2xl">{weekDates[index]}</div>*/}
{/*                                </button>*/}
{/*                            ))}*/}
{/**!/*/}
{/*                            {monthDates.map((dateObj, index) => (*/}
{/*                                <button*/}
{/*                                    key={index}*/}
{/*                                    className="flex flex-col mt-3 items-center p-8 w-35 h-35 bg-gray-800 bg-opacity-50 text-white p-5 w-40 h-50 rounded-lg shadow-md hover:bg-orange-400 transition-colors duration-300">*/}

{/*                                    <div className="text-lg">{dateObj.day}</div>*/}
{/*                                    <div className="text-2xl">{dateObj.date}</div>*/}
{/*                                </button>*/}
{/*                            ))}*/}

{/*                        </div>*/}
{/*                    </div>*/}
{/*                </div>*/}
{/*            </div>*/}
            {/* Create a small box with a light blue background, positioned in front of the big box */}
            {/*<div className="fixed right-7 top-10 rounded-lg shadow-md h-1/4 w-2/3 bg-lightblue-800 p-4 md:w-3/4 z-10">*/}
            {/*    <div className="flexCenter space-x-1 bg-white-500 text-grey-100 p-4 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300">*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*Appointment*/}



        </div >


    );
}

export default Sidebar;