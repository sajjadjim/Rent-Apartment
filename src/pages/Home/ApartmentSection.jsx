import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { DHAKA_APARTMENTS } from "../../data/dhakaData";
import { FaBed, FaBath, FaMapMarkerAlt, FaTruck, FaWrench, FaArrowRight } from "react-icons/fa";

const ApartmentSection = () => {
  const [apartments, setApartments] = useState(DHAKA_APARTMENTS.slice(0, 6));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch from server, fallback to Dhaka apartments
    const fetchApts = async () => {
      try {
        const res = await axios.get("https://blockwise-server.vercel.app/apartments", { timeout: 3000 });
        if (res.data?.apartments && res.data.apartments.length > 0) {
          // Merge with Dhaka details
          const merged = res.data.apartments.slice(0, 6).map((apt, idx) => ({
            ...apt,
            areaName: apt.blockName?.includes("Gulshan") ? "Gulshan" : "Dhaka City",
            areaId: "gulshan",
            bedrooms: 3,
            bathrooms: 3,
            apartmentImage: apt.apartmentImage || DHAKA_APARTMENTS[idx % DHAKA_APARTMENTS.length].apartmentImage
          }));
          setApartments(merged);
        }
      } catch (err) {
        // Fallback to top Dhaka apartments
        setApartments(DHAKA_APARTMENTS.slice(0, 6));
      }
    };

    fetchApts();
  }, []);

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-12 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <FaMapMarkerAlt /> Featured Dhaka Properties
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trending Apartments Available for Rent in Dhaka
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Verified flats in prime Dhaka areas with complete amenities, modern elevator access, standby power, and immediate agreement processing.
            </p>
          </div>
          <Link
            to="/apartments"
            className="btn btn-outline border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white rounded-2xl font-bold flex items-center gap-2 self-start md:self-auto"
          >
            Explore All Apartments <FaArrowRight size={12} />
          </Link>
        </div>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apt) => (
            <article
              key={apt._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={apt.apartmentImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"}
                    alt={apt.title || `Apartment ${apt.apartmentNo}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {apt.areaName || "Dhaka City"}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-600 text-white font-extrabold text-sm px-3 py-1 rounded-xl shadow-lg">
                    ৳{apt.rent?.toLocaleString()} <span className="text-[10px] font-normal opacity-90">/mo</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {apt.title || `Flat ${apt.apartmentNo}, ${apt.blockName}`}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <FaMapMarkerAlt className="text-red-400" /> {apt.blockName} • Floor {apt.floorNo}
                  </p>

                  <div className="flex items-center gap-4 py-2 border-y border-slate-100 text-xs text-slate-600 mb-3">
                    <span className="flex items-center gap-1"><FaBed className="text-blue-500" /> {apt.bedrooms || 3} Beds</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FaBath className="text-indigo-500" /> {apt.bathrooms || 3} Baths</span>
                    <span>•</span>
                    <span>{apt.sizeSqft || 1650} sqft</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {apt.description || "Modern apartment with ample natural light, high-security gate, and great connectivity across Dhaka."}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <Link
                  to="/apartments"
                  className="btn btn-sm btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  View Details & Rent
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/movers?to=${apt.areaId || "banani"}`}
                    className="btn btn-xs btn-outline border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center justify-center gap-1"
                  >
                    <FaTruck size={10} className="text-blue-600" /> Shift Here
                  </Link>
                  <Link
                    to={`/technicians?area=${apt.areaId || "gulshan"}`}
                    className="btn btn-xs btn-outline border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg flex items-center justify-center gap-1"
                  >
                    <FaWrench size={10} className="text-emerald-600" /> Setup Pro
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;
