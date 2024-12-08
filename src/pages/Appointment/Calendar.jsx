import moment from "moment";
import PropTypes from "prop-types";

const Calendar = ({ onDateSelected, daysWithAppointments }) => {
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
      <div
          className="calendar-container p-4 min-h-screen ml-72 h-3/10"
          style={{ width: "calc(66.6667% - 90px)" }}
      >
        <div className=" rounded-xl shadow-md border border-lightblue-400 w-4/6 bg-blue-500 md:w-3/4 md:h-3/10 z-20 p-6 ">
          <div className="text-first text-3xl font-lg text-white mb-4">
            Our Appointment
          </div>
          <div className="overflow-x-auto h-full overflow-hidden scrollbar-hide">
            <div className="flex space-x-4">
              {monthDates.map((dateObj, index) => (
                  <button
                      key={index}
                      onClick={() => onDateSelected(dateObj.fullDate)}
                      className={`flex-shrink-0 w-32 h-32 p-4 rounded-lg text-center cursor-pointer ${
                          daysWithAppointments.includes(dateObj.fullDate)
                              ? "bg-green-500"
                              : "bg-gray-800"
                      } bg-opacity-50 text-white p-5 rounded-lg shadow-md hover:bg-orange-400  transition-colors duration-300`}
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
