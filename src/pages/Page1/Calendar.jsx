import React from 'react';

const Calendar = () => {
    const currentDate = new Date();
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDay = currentDate.getDay();
    const currentDateNumber = currentDate.getDate();

    return (
        <div className="calendar-container">
            {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-box">
                    <div className="day">{day}</div>
                    <div className="date">{currentDateNumber + (index - currentDay)}</div>
                </div>
            ))}
        </div>
    );
}

export default Calendar;