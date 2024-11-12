import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Hero = () => {
    const navigate = useNavigate();

    return (
    <div className = "flex-col items-center py-40">

        <div className="flex justify-center mb-10">
        <img
            src={assets.logo}
            alt="Logo"
            className="w-[170px] h-[170px] max-w-sm rounded-xl "
        />
    </div>
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center font-poppins">
            WELCOME TO <div className="text-blue-600">IU HEALTHCARE</div>
        </h1>
        <p className="text-gray-600 text-2xl text-center mb-10">
            Your health is our priority, and we’re here every step of the way
            to support, heal, and empower you{" "}
        </p>

        <div className="flex flex-col sm:flex-row min-h-screen flexCenter">

            <div className="min-h-screen flex flex-col items-center">
                <div className=" mx-auto p-5 mt-1 mb-8 ">
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="flexCenter bg-gradient-to-r from-blue-700 to-blue-500 text-white text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-400 transition transform hover:-translate-y-1 duration-300 animate-pulse"
                        >
                            <IoIosArrowForward />

                            GET STARTED
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
};

export default Hero;
