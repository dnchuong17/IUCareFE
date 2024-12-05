import moment from "moment";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const Calendar = () => {
  const currentDate = new Date();
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDay = currentDate.getDay();
  const currentDateNumber = currentDate.getDate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const getNext30Days = () => {
    const dates = [];
    const today = moment();

    for (let i = 0; i < 30; i++) {
      const date = today.clone().add(i, "days");
      dates.push({
        day: date.format("ddd"), // e.g., 'Tue'
        date: date.date(),
        isToday: i === 0,
      });
    }
    return dates;
  };

  const monthDates = getNext30Days();
  const scrollLeft = () => {
    setScrollPosition(scrollPosition - 1);
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 1);
  };

  const handleOptionsClick = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="calendar-container p-4 min-h-screen">
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-box">
            <div className="day text-center ">{day}</div>
            <div className="date text-center ">
              {currentDateNumber + (index - currentDay)}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed right-11 top-5 rounded-xl shadow-md border border-lightblue-400 h-1/5 w-4/6 bg-blue-500 md:w-3/4 md:h-3/10 z-20 p-4">
        <div className="flex justify-between space-x-1 bg-white-500 text-grey-100 p-4 rounded-lg cursor-pointer mt-5 px-3 py-3 ">
          {/* create a white text "Our Appointment" this text at the right side of big box */}

          <div className="absolute top-4 left-8 text-white text-3xl width-24 height\shadow-sm">
            Our Appointment
          </div>
          <div className="absolute top-2 right-2">
            <button className="kebab-menu-button text-white mt-4 mr-4">
              <FaEllipsisV />
              {showPopup && (
                <div className="absolute right-0 mt-2 bg-white p-2 rounded-lg shadow-lg z-30">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => alert("Create Appointment")}
                  >
                    Create Appointment
                  </button>
                </div>
              )}
            </button>
          </div>
          <div className="overflow-x-auto h-full overflow-hidden scrollbar-hide">
            <div className="flex space-x-3">
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
                  className="flex flex-col mt-5 items-center p-8 w-32 h-32 bg-gray-800 bg-opacity-50 text-white p-5 rounded-lg shadow-md hover:bg-blue-100 hover:bg-opacity-50 transition-colors duration-300"
                >
                  <div className="text-lg">{dateObj.day}</div>
                  <div className="text-2xl">{dateObj.date}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
