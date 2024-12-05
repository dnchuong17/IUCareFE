import React from "react";
import moment from "moment";

const Calendar = ({ onDateSelected, daysWithAppointments }) => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const getNext30Days = () => {
        const dates = [];
        const today = moment();

        for (let i = 0; i < 30; i++) {
            const date = today.clone().add(i, "days");
            dates.push({
                day: date.format("ddd"), // e.g., 'Tue'
                date: date.date(),
                fullDate: date.format("YYYY-MM-DD"), // Full date for selection
            });
        }
        return dates;
    };

    const monthDates = getNext30Days();

    return (
        <div className="calendar-container p-4 min-h-screen">
            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="calendar-box">
                        <div className="day text-center">{day}</div>
                    </div>
                ))}
            </div>
            <div className="fixed right-11 top-5 rounded-xl shadow-md border border-lightblue-400 h-1/5 w-4/6 bg-blue-500 md:w-3/4 md:h-3/10 z-20 p-4">
                <div className="overflow-x-auto h-full overflow-hidden scrollbar-hide">
                    <div className="flex space-x-3">
                        {monthDates.map((dateObj, index) => (
                            <button
                                key={index}
                                onClick={() => onDateSelected(dateObj.fullDate)}
                                className={`flex flex-col mt-5 items-center p-8 w-32 h-32 ${daysWithAppointments.includes(dateObj.fullDate) ? "bg-green-500" : "bg-gray-800"} bg-opacity-50 text-white p-5 rounded-lg shadow-md hover:bg-blue-100 hover:bg-opacity-50 transition-colors duration-300`}
                            >
                                <div className="text-lg">{dateObj.day}</div>
                                <div className="text-2xl">{dateObj.date}</div>
                                {daysWithAppointments.includes(dateObj.fullDate) && (
                                    <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
