import React from 'react';
import {assets} from "../assets/assets.js";

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt=""/>
                    <p className='w-full md:w-2/3 text-gray-600'>For further troubleshooting or if you wish to automate this process for all downloaded apps, you could consider using </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Learn more</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>About IU Health Care </li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
