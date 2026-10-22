import React from "react";
import aboutImg from "../../../src/assets/window-7542846_1280.jpg"; 

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 border-b border-slate-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Image */}
        <div>
          <img
            src={aboutImg}
            alt="About Rent Apartment Dhaka"
            className="rounded-3xl shadow-xl w-full object-cover h-[380px]"
          />
        </div>

        {/* Right - Text */}
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Why Rent Apartment
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Dhaka's 1st End-to-End Rental, Moving & Home Setup Platform
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            At Rent Apartment, we simplify the most stressful day of your life — finding and moving into a new apartment in Dhaka City. From discovering verified flats across Dhaka to calculating moving vehicle fares by distance, hiring trusted furniture organizers, and booking certified AC & electrical technicians.
          </p>
          <ul className="space-y-3 text-slate-700 text-sm font-medium">
            <li className="flex items-center gap-2">✔️ Verified Dhaka apartments with real rental rates & floor plans</li>
            <li className="flex items-center gap-2">✔️ Distance-based shifting fare with Pickup, Mini Truck & Covered Vans</li>
            <li className="flex items-center gap-2">✔️ Dedicated furniture carrying & organizing helpers for your new rooms</li>
            <li className="flex items-center gap-2">✔️ Nearby certified technicians for AC installation, TV mount & wiring</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
