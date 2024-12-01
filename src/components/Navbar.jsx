import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from 'framer-motion'



const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (

      <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-50 top-0">


        <div className="flex items-center justify-between py-5 font-medium">
          <div className="container mx-auto flex items-center justify-between gap-2 border w-full px-6 py-2 rounded-full shadow-lg">
            <div className="flex items-center space-x-3">
              <img className="w-10 h-10" src={assets.logo} alt="" />
              <p className="text-xl tracking-wide font-poppins font-bold">
                IU Health Care
              </p>
            </div>
            <ul className="hidden sm:flex gap-5 text-base text-gray-700">
              <NavLink to="/" className="flex flex-col items-center gap-2 font-bold">
                <p>HOME</p>
                <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink to="/about" className="flex flex-col items-center gap-2 font-bold">
                <p>ABOUT</p>
                <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink to="/appointment" className="flex flex-col items-center gap-2 font-bold">
                <p>APPOINTMENT</p>
                <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>
            </ul>

            <div className="flex items-center gap-6">
              <Link
                  to="/register"
                  className="w-full px-8 py-2 rounded-full text-white text-center cursor-pointer transition transform hover:scale-105 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-blue-700"
              >
                Register
              </Link>
              <Link
                  to="/login"
                  className="w-full px-8 py-2 rounded-full text-white text-center cursor-pointer transition transform hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800"
              >
                Sign In
              </Link>
              <img
                  onClick={() => setVisible(true)}
                  src={assets.menu_icon}
                  className="w-5 cursor-pointer sm:hidden"
                  alt=""
              />
            </div>
          </div>

          {/* Sidebar menu for small screens */}
          <div
              className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
                  visible ? "w-full" : "w-0"
              }`}
          >
            <div className="flex flex-col text-gray-600">
              <div
                  onClick={() => setVisible(false)}
                  className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img className="h-4 rotate-180" src={assets.back_icon} alt="" />
                <p>Back</p>
              </div>
              <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6 border text-lg"
                  to="/"
              >
                HOME
              </NavLink>
              <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6 border text-lg"
                  to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6 border text-lg"
                  to="/appointment"
              >
                APPOINTMENT
              </NavLink>
            </div>
          </div>
        </div>
      </motion.div>
  );
};

export default Navbar;
