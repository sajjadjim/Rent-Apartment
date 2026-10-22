import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { DHAKA_AREAS, calculateDhakaDistance, VEHICLE_TYPES } from "../../data/dhakaData";
import { FaTruck, FaRoute, FaUsers, FaArrowRight, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

const MoversSection = () => {
  const navigate = useNavigate();
  const [fromArea, setFromArea] = useState("mirpur");
  const [toArea, setToArea] = useState("gulshan");
  const [selectedVehicle, setSelectedVehicle] = useState("mini_truck_15ton");
  const [helpersCount, setHelpersCount] = useState(2);

  const routeInfo = useMemo(() => {
    return calculateDhakaDistance(fromArea, toArea);
  }, [fromArea, toArea]);

  const vehicleObj = useMemo(() => {
    return VEHICLE_TYPES.find((v) => v.id === selectedVehicle) || VEHICLE_TYPES[1];
  }, [selectedVehicle]);

  const estimatedFare = useMemo(() => {
    const base = vehicleObj.baseFare;
    const distCost = Math.round(routeInfo.distance * vehicleObj.perKmRate);
    const helpersCost = helpersCount * 650;
    return base + distCost + helpersCost;
  }, [vehicleObj, routeInfo.distance, helpersCount]);

  const handleQuickBook = () => {
    navigate(`/movers?from=${fromArea}&to=${toArea}`);
  };

  return (
    <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value props (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-500/30 uppercase tracking-wider">
              <FaTruck /> Dhaka Shifting & Transport
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Calculate Distance & Moving Fare for Your New Home
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Moving your household goods across Dhaka? Our automated distance calculator checks the road kilometers between your old apartment and new apartment, giving you an exact, transparent fare with zero hidden fees.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl mt-0.5">
                  <FaRoute />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Real Dhaka Road Distance (KM)</h4>
                  <p className="text-xs text-slate-400">Accurate kilometer estimation between all key Dhaka neighborhoods.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl mt-0.5">
                  <FaTruck />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Right Vehicle for Household Accessories</h4>
                  <p className="text-xs text-slate-400">Choose from 1-Ton Pickups, 1.5-Ton Mini Trucks, to 14-ft Covered Vans.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl mt-0.5">
                  <FaUsers />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Dedicated Furniture Organizers</h4>
                  <p className="text-xs text-slate-400">Book professional helpers to pack, carry stairs/lifts, and arrange furniture.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Calculator Card (7 cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Live Shifting Fare Estimator</h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                Verified Dhaka Fleet
              </span>
            </div>

            {/* From / To Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-red-500" /> Old Apartment (From)
                </label>
                <select
                  value={fromArea}
                  onChange={(e) => setFromArea(e.target.value)}
                  className="select select-bordered select-sm w-full bg-slate-50 font-medium"
                >
                  {DHAKA_AREAS.map((a) => (
                    <option key={`m-from-${a.id}`} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-emerald-500" /> New Apartment (To)
                </label>
                <select
                  value={toArea}
                  onChange={(e) => setToArea(e.target.value)}
                  className="select select-bordered select-sm w-full bg-slate-50 font-medium"
                >
                  {DHAKA_AREAS.map((a) => (
                    <option key={`m-to-${a.id}`} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Distance & Route Result */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Distance & Est. Travel Time:</span>
                <span className="text-xl font-black text-blue-600">
                  {routeInfo.distance} KM • ~{routeInfo.time}
                </span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-lg">
                Dhaka Traffic Adjusted
              </span>
            </div>

            {/* Vehicle Type Pills */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Vehicle Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {VEHICLE_TYPES.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVehicle(v.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedVehicle === v.id
                        ? "border-blue-600 bg-blue-50 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl block mb-1">{v.icon}</span>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">{v.name.split("(")[0]}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">৳{v.baseFare} base</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Helpers count */}
            <div className="mb-6 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Moving Helpers / Organizers:</span>
                <span className="text-[11px] text-slate-500">Pack, carry and assemble furniture</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setHelpersCount(n)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      helpersCount === n
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Fare & CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Estimated Shifting Fare:</span>
                <span className="text-3xl font-black text-slate-900">৳{estimatedFare.toLocaleString()} <span className="text-xs font-normal text-slate-500">BDT</span></span>
              </div>
              <button
                onClick={handleQuickBook}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-2xl w-full sm:w-auto shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                Customize & Book Move <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoversSection;
