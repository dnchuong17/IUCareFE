import React, { useState, useEffect} from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Calendar = ({ onDateSelected, daysWithAppointments }) => {
  const [selectedDate, setSelectedDate] = useState(null);

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

  useEffect(() => {
    if (monthDates.length > 0) {
      setSelectedDate(monthDates[0].fullDate);
      onDateSelected(monthDates[0].fullDate);
    }
  }, []); // Run only once on mount

  return (
    <div className="absolute h-screen p-4 max-h-screen w-4/5">
      <div className="rounded-xl shadow-md border border-lightblue-400 bg-blue-600 p-6">
        <div className="text-first text-3xl font-lg text-white mb-4">
          Our Appointment
        </div>
        <div className="overflow-x-auto h-full overflow-hidden scrollbar-hide">
          <div className="flex space-x-4">
            {monthDates.map((dateObj, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDate(dateObj.fullDate);
                  onDateSelected(dateObj.fullDate);
                }}
                className={`flex-shrink-0 w-32 h-32 p-4 rounded-lg text-center cursor-pointer ${
                  selectedDate === dateObj.fullDate
                    ? "bg-orange-500"
                    : daysWithAppointments.includes(dateObj.fullDate)
                    ? "bg-green-50 bg-opacity-50"
                    : "bg-gray-800 bg-opacity-50"
                } text-white p-5 rounded-lg shadow-md hover:bg-orange-400 transition-colors duration-300`}
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

Calendar.propTypes = {
  onDateSelected: PropTypes.func.isRequired,
  daysWithAppointments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Calendar;
