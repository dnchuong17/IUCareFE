import React from "react";
import {assets} from "../../assets/assets.js";
import { motion } from 'framer-motion'

const Appointment = () => {
  return (
  <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.75,
        delay: 0.75,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="text-gray-800 font-sans py-16">
    <div className="max-w-screen-lg mx-auto text-center px-4">
      <div className="text-5xl font-bold mb-6 font-poppins">
       <h2> OUR APPOINTMENT BOOKING SERVICE </h2>
      </div>

      <p className="text-2xl text-gray-700 mb-12">
        Our service allows you to easily book an appointment with our experts. Select the date and time that suits you best, and we will contact you shortly to confirm the appointment.
      </p>

      <div className="flexCenter">
        <img
          src={assets.appointment}
          className="mx-auto rounded-lg shadow-lg" />
      </div>

      <div>
        <button
          className="mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 animate-bounce" >
          BOOKING NOW
        </button>
      </div>
    </div>
  </motion.div>
);
};

export default Appointment;
