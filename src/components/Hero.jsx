import React from 'react';
import { Link } from 'react-router-dom';
// import MockupBrowser from './MockupBrowser'; // Import the new component

import { assets } from "../assets/assets.js";
import { FiArrowRightCircle } from "react-icons/fi";

const Hero = () => {

    return (
        <div className='flex flex-col sm:flex-row min-h-screen'>
            <div className='flex-col flexCenter flex-grow'>
                <img className='size-40 drop-shadow-lg' src={assets.logo} />
                <p className='text-2xl'>Welcome</p>
                <div className='flexCenter flex-col mt-1 space-y-3'>
                    <p className='text-4xl font-black italic drop-shadow-lg'>IU HEALTH CARE</p>
                    <p className='text-center'> Dedicated to Providing Exceptional Health Care That <br /> Nurtures Growth, Resilience, and Community Well-Being</p>
                </div>
                <div className='flexCenter space-x-1 bg-blue-500 text-white p-2 rounded-lg mt-5 cursor-pointer px-3'>
                    <Link to="/page1" className="flex items-center space-x-1">
                        <button>Getting Started</button>
                        <FiArrowRightCircle />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;