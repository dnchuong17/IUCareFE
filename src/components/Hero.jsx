import React from "react";
import { assets } from "../assets/assets.js";
import { FiArrowRightCircle } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="flex-col flexCenter flex-grow">
        <img className="size-40 drop-shadow-lg" src={assets.logo} />
        <p className="text-2xl">Welcome</p>
        <div className="flexCenter flex-col mt-1 space-y-3">
          <p className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">
            IU HEALTH CARE
          </p>
          <p className="text-center">
            {" "}
            Dedicated to Providing Exceptional Health Care That <br /> Nurtures
            Growth, Resilience, and Community Well-Being
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg mt-8 cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out">
          <button className="text-lg font-sans">Getting Started</button>
          <FiArrowRightCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
