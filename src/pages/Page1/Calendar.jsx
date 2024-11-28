
import moment from 'moment';
import React, { useState } from 'react';

const Calendar = () => {
    const currentDate = new Date();
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDay = currentDate.getDay();
    const currentDateNumber = currentDate.getDate();
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
        <div className="calendar-container">
            {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-box">
                    <div className="day">{day}</div>
                    <div className="date">{currentDateNumber + (index - currentDay)}</div>
                </div>
            ))}
            <div className="fixed right-11 top-5 rounded-xl shadow-md border border-lightblue-400 h-1/5 w-4/6 bg-blue-500 md:w-3/4 md:h-3/10 z-20 p-4">
                <div className="flex justify-between space-x-1 bg-white-500 text-grey-100 p-4 rounded-lg mt-5 cursor-pointer px-3 ">
                    {/* create a white text "Our Appointment" this text at the right side of big box */}
                    <div className="absolute top-4 left-8 text-white text-3xl width-24 height\shadow-sm">Our Appointment</div>                    <div className="overflow-x-auto h-full"> {/* Scrollable container */}
                        <div className="flex space-x-4">
                            {/* {daysOfWeek.map((day, index) => (
                                <button key={index} className="flex flex-col mt-3 items-center p-5 w-35 h-35 bg-gray-800 bg-opacity-50 text-white p-5 w-40 h-50 rounded-lg shadow-md hover:bg-orange-400 transition-colors duration-300">
                                    <div className="text-lg">{day}</div>
                                    <div className="text-2xl">{weekDates[index]}</div>
                                </button>xw
                            ))}
*/}
                            {monthDates.map((dateObj, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col mt-5 items-center p-8 bg-gray-800 bg-opacity-50 text-white p-5 w-25 h-25 rounded-lg shadow-md hover:bg-blue-100 hover:bg-opacity-50 transition-colors duration-300">

                                    <div className="text-lg">{dateObj.day}</div>
                                    <div className="text-2xl">{dateObj.date}</div>
                                </button>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            {/* Create a small box with a light blue background, positioned in front of the big box */}
            <div className="fixed right-7 top-10 rounded-lg shadow-md h-1/4 w-2/3 bg-lightblue-800 p-4 md:w-3/4 z-10">
                <div className="flexCenter space-x-1 bg-white-500 text-grey-100 p-4 rounded-lg mt-5 cursor-pointer px-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-orange-700 transition-colors duration-300">
                </div>
            </div>
        </div>
    );
}

export default Calendar;