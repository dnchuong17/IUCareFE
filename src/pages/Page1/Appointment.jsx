// Make a Appointment button to navigate to the Appointment page.
// In the sidebar of Page1, add a button that navigates to the Appointment page.
import React from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
    return (
        <div>

            <Link to="/appointment">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Make a Appointment
                </button>
            </Link>
        </div>
    )
}

export default Doctor;