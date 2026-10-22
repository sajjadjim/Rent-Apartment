import React from "react";
import { Link } from "react-router";
import { DHAKA_AREAS } from "../../data/dhakaData";
import { FaMapMarkerAlt, FaCheck, FaBuilding, FaTruck, FaWrench, FaShieldAlt } from "react-icons/fa";

const DhakaCoverageSection = () => {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FaMapMarkerAlt /> 100% Dhaka City Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Available Across All Prime Dhaka Neighborhoods
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Whether you are renting in North Dhaka, Central Dhaka, or Old Town, our network of verified apartments, moving trucks, and technicians is ready at your doorstep.
          </p>
        </div>

        {/* 4-Step Move-in Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: "01",
              title: "Find & Rent Apartment",
              desc: "Explore verified Dhaka flats with honest photos, clear rent in ৳ BDT, and immediate agreement approval.",
              icon: <FaBuilding size={24} className="text-blue-600" />,
              badge: "Browse Flats"
            },
            {
              step: "02",
              title: "Calculate Distance & Fare",
              desc: "Select old to new house locations in Dhaka to see exact road distance (KM) and transparent vehicle fare.",
              icon: <FaTruck size={24} className="text-emerald-600" />,
              badge: "Fair Price"
            },
            {
              step: "03",
              title: "Book Helpers & Truck",
              desc: "Choose from 1-Ton Pickups to 14ft Covered Vans plus dedicated furniture carrying & organizing helpers.",
              icon: <FaShieldAlt size={24} className="text-indigo-600" />,
              badge: "Careful Move"
            },
            {
              step: "04",
              title: "Setup AC & Electronics",
              desc: "Nearby technicians arrive at your new flat for split AC installation, TV wall mounting & electrical hookup.",
              icon: <FaWrench size={24} className="text-amber-500" />,
              badge: "Same-Day Setup"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="text-5xl font-black text-slate-100 absolute top-4 right-4 pointer-events-none">
                {item.step}
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl w-fit mb-4">{item.icon}</div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
                {item.badge}
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dhaka Areas Grid */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Active Service Zones in Dhaka</h3>
              <p className="text-xs text-slate-500">Apartments, Shifting Vehicles & Technicians on stand-by</p>
            </div>
            <Link to="/apartments" className="btn btn-sm btn-primary bg-blue-600 text-white font-bold rounded-xl">
              Explore Available Flats
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DHAKA_AREAS.map((area) => (
              <Link
                key={area.id}
                to={`/apartments?area=${area.id}`}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200/80 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                    {area.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">{area.zone}</span>
                </div>
                <FaMapMarkerAlt className="text-slate-300 group-hover:text-red-500 text-xs transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DhakaCoverageSection;
