import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { FaCalendarAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";

const Sidebar = () => {
  const handleHomeClick = () => {
    setDate(today.add(0, "days"));
  };
  return (
    <div className="flex">
      <div className="absolute left-0 top-0 h-screen w-1/5 md:w-1/5.5 bg-white p-4 overflow-y-auto max-h-screen">
        <img
          src={assets.sidebar_logo}
          alt="Sidebar Logo"
          className="w-full h-auto mb-4 md:p-1 md:top-0 hover:scale-105  rounded transition-transform duration-300 top-4 left-4"
        />
        <div className="flex flex-col space-y-5 mb-12 ">
          <div className="group flexCenter space-x-1 mt-4 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300">
            <HiHome className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
            <Link
              to="/appointmentPage"
              onClick={handleHomeClick}
              className="flex items-center space-x-1 w-full"
            >
              <button className="w-full text-left ml-10 mr-10 text-lg md:text-base lg:text-lg p-2 md:p-1 lg:p-3">
                Home
              </button>
            </Link>
          </div>
          <div className="group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300">
            <FaCalendarAlt className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
            <Link
              to="/tableList"
              className="flex items-center space-x-1 w-full"
            >
              <button className="w-full text-left ml-10 text-lg md:text-base lg:text-lg p-2 md:p-1 lg:p-3">
                Patient
              </button>
            </Link>
          </div>
          <div className="group flexCenter space-x-1 bg-white-500 text-gray-600 p-2 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300">
            <FaUser className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
            <Link
              to="/doctorProfile"
              className="flex items-center space-x-1 w-full"
            >
              <button className="w-full text-left ml-10 text-lg md:text-base lg:text-lg p-2 md:p-1 lg:p-3">
                Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="border-b-2 border-gray-100 mt-28"></div>
        <div className="group flexCenter space-x-1 bg-white-500 text-gray-600 p-6 md:p-1 rounded-lg mt-5 cursor-pointer px-3 hover:bg-blue-200 hover:bg-opacity-50 hover:text-blue-700 transition-colors duration-300">
          <FaSignOutAlt className="text-blue-300 group-hover:text-blue-700 ml-5 text-2xl" />
          <Link to="/" className="flex items-center space-x-1 w-full">
            <button className="w-full text-left ml-10 text-lg md:text-base lg:text-lg p-2 md:p-1 lg:p-3">
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
