import React from "react";
import { Link } from "react-router";
import { TECHNICIAN_SERVICES, DHAKA_TECHNICIANS } from "../../data/dhakaData";
import { FaWrench, FaSnowflake, FaBolt, FaStar, FaCheckCircle, FaArrowRight, FaShieldAlt } from "react-icons/fa";

const TechniciansSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <FaSnowflake /> New Apartment Installation Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AC & Electronics Technicians Near Your New House
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Moving into your new Dhaka apartment? Book verified technicians living in your new neighborhood to quickly install ACs, wall mount TVs, hang fans, and assemble furniture.
            </p>
          </div>
          <Link
            to="/technicians"
            className="btn btn-outline border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white rounded-2xl font-bold flex items-center gap-2 self-start md:self-auto"
          >
            View All Services & Technicians <FaArrowRight size={12} />
          </Link>
        </div>

        {/* Popular Installation Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TECHNICIAN_SERVICES.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl p-3 bg-white rounded-2xl shadow-sm inline-block mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-1">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{service.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Standard Rate</span>
                  <span className="text-base font-extrabold text-blue-600">৳{service.price}</span>
                </div>
                <Link
                  to="/technicians"
                  className="btn btn-xs btn-primary bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Local Technicians snippet */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-10 rounded-3xl shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-700">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Verified Dhaka Pros
              </span>
              <h3 className="text-2xl font-extrabold text-white">Book Nearby Technicians in 30 Seconds</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Each expert comes equipped with drilling machines, ladder access, and multi-meter testing kits.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5"><FaShieldAlt className="text-emerald-400" /> Police Verified</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-blue-400" /> 7-Day Free Warranty</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DHAKA_TECHNICIANS.slice(0, 3).map((tech) => (
              <div
                key={tech.id}
                className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/80 flex items-center gap-4"
              >
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-600"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm truncate">{tech.name}</h4>
                  <p className="text-xs text-blue-400 font-medium truncate">{tech.trade}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <FaStar /> {tech.rating}
                    </span>
                    <span>•</span>
                    <span>{tech.area.split("&")[0]}</span>
                  </div>
                </div>
                <Link
                  to="/technicians"
                  className="btn btn-xs btn-outline border-slate-500 text-white hover:bg-white hover:text-slate-900 rounded-lg text-[11px]"
                >
                  Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechniciansSection;
