import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import { FiLogIn, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium ">
      <div className="flex items-center justify-between gap-2 border w-full px-6 py-2 rounded-full shadow-lg">
        <div className="flex items-center space-x-3">
          <img className="w-10 h-10" src={assets.logo} alt="" />
          <p className="text-xl font-semibold tracking-wide font-serif">
            IU Health Care
          </p>
        </div>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-2">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/about" className="flex flex-col items-center gap-2">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/doctor" className="flex flex-col items-center gap-2">
            <p>DOCTOR</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/appointment"
            className="flex flex-col items-center gap-2"
          >
            <p>APPOINTMENT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <Link
            to="/register"
            className="w-full px-8 py-2 rounded-full bg-green-500 text-white text-center cursor-pointer transition transform hover:scale-105"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="w-full px-8 py-2 rounded-full bg-blue-500 text-white text-center cursor-pointer transition transform hover:scale-105"
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

      {/*Sidebar menu for small screens*/}
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
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/doctor"
          >
            DOCTOR
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/appointment"
          >
            APPOINTMENT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
