import React from "react";
import { assets } from "../assets/assets.js";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto px-8 md:px-16 lg:px-24 my-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start text-sm mb-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-center lg:items-start mb-10 lg:mb-0 lg:w-1/3 text-center lg:text-left">
            <img
              src={assets.logo}
              className="mb-5 w-32"
              alt="IU Health Care Logo"
            />
            <p className="w-full md:w-2/3 text-gray-600">
              For further troubleshooting or if you wish to automate this
              process for all downloaded apps, you could consider using{" "}
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between lg:w-2/3">
            <div className="flex-1 mb-10 lg:mb-0">
              <p className="text-xl font-semibold mb-4 text-center lg:text-left">
                Learn more
              </p>
              <ul className="flex flex-col gap-2 text-gray-600">
                <li className="hover:text-blue-600 cursor-pointer">
                  About IU Health Care
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Contact us
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="flex-1 mb-10 lg:mb-0">
              <p className="text-xl font-semibold mb-4 text-center lg:text-left">
                Contact
              </p>
              <ul className="flex flex-col gap-2 text-gray-600 text-center lg:text-left">
                <li>123 Health St.</li>
                <li>Quarter 6, Linh Trung Ward, Thu Duc City</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: support@iuhealthcare.hcmiu.edu.vn</li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="flex-1 flex flex-col items-center lg:items-start">
              <p className="text-xl font-semibold mb-4 text-center lg:text-left">
                Follow Us
              </p>
              <ul className="flex gap-4">
                <li>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-pink-500 hover:text-pink-700 transition-colors"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-4 text-gray-500">
          &copy; 2024 IU Health Care. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
