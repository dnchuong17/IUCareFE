import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { FaCalendarAlt, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex">
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 text-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <FaBars className="text-3xl" />
            </button>

            <div
                className={`absolute left-0 top-0 h-screen w-1/5 md:w-1/5.5 bg-white p-4 overflow-y-auto max-h-screen ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:w-1/5 md:max-h-screen`}
            >
                <Link to="/">
                    <img
                        src={assets.sidebar_logo}
                        alt="Sidebar Logo"
                        className="w-full h-auto mb-4 md:p-1 md:top-0 hover:scale-105  rounded transition-transform duration-300 top-4 left-4"
                    />
                </Link>

                <div className="flex flex-col space-y-5 mb-12 ">
                    <MenuItem
                        to="/appointmentPage"
                        icon={<HiHome />}
                        label="Home"
                        className="flex items-center space-x-1 w-full"
                    />
                    <MenuItem
                        to="/tableList"
                        icon={<FaCalendarAlt />}
                        label="Patient"
                        className="flex items-center space-x-1 w-full"
                    />
                    <MenuItem
                        to="/doctorProfile"
                        icon={<FaUser />}
                        label="Profile"
                    />
                </div>

                <div className="border-b-2 border-gray-100 mt-28"></div>

                <MenuItem
                    to="/"
                    icon={<FaSignOutAlt />}
                    label="Logout"
                    extraClass="mt-5"
                />
            </div>
        </div>
    );
};

// Menu Item Component
const MenuItem = ({ to, icon, label, extraClass = "" }) => (
    <div
        className={`group flex items-center space-x-24 text-2xl p-3 rounded-lg cursor-pointer hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300 ml-1 mr-1 ${extraClass}`}
    >
        <div className="text-blue-300 group-hover:text-blue-700 text-2xl">
            {icon}
        </div>
        <Link to={to} className="flex-grow">
            <button className="w-full text-left text-lg md:text-base lg:text-lg">
                {label}
            </button>
        </Link>
    </div>
);

export default Sidebar;
