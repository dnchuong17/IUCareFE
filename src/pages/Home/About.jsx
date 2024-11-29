import React from "react";
import { assets } from "../../assets/assets";

function About() {
  return (
      <div className=" text-gray-800 font-sans py-16">

        <div className="max-w-screen-lg mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-6 font-poppins">ABOUT IU HEALTHCARE</h2>
          <p className="text-2xl text-gray-700 mb-12 ">
            We are a dedicated team with a passion for healthcare excellence. Our mission is to provide quality care and services that make a difference in people's lives.
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={assets.about1}
                   className="w-full h-56 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">Our Facilities</h3>
                <p className="text-gray-600">State-of-the-art facilities for top-quality care.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={assets.about2}
                   className="w-full h-56 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">Our Team</h3>
                <p className="text-gray-600">Experienced professionals at your service.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={assets.about3}
                   className="w-full h-56 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-gray-600">Committed to enhancing lives and health.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default About;
