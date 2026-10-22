import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  DHAKA_AREAS,
  TECHNICIAN_SERVICES,
  DHAKA_TECHNICIANS
} from "../../data/dhakaData";
import { saveBooking } from "../../utils/bookingStore";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaWrench,
  FaBolt,
  FaSnowflake,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUserCheck,
  FaFilter
} from "react-icons/fa";

const Technicians = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(routerLocation.search);
  const initialArea = searchParams.get("area") || "gulshan";

  // State
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedServices, setSelectedServices] = useState(["ac_install", "electrician_tv_mount"]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Form states for booking modal
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("10:00 AM - 01:00 PM");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [newApartmentAddress, setNewApartmentAddress] = useState("");
  const [notes, setNotes] = useState("");

  const categories = ["All", "Air Conditioning", "Electrical", "Plumbing", "Carpentry", "Cleaning"];

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return TECHNICIAN_SERVICES;
    return TECHNICIAN_SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Filter technicians by selected area
  const filteredTechnicians = useMemo(() => {
    if (selectedArea === "all") return DHAKA_TECHNICIANS;
    const targetArea = DHAKA_AREAS.find((a) => a.id === selectedArea);
    return DHAKA_TECHNICIANS.filter((t) => {
      if (t.areaId === selectedArea) return true;
      if (t.area.toLowerCase().includes(targetArea?.name.toLowerCase() || "")) return true;
      if (t.area.includes("All Dhaka")) return true;
      return false;
    });
  }, [selectedArea]);

  // Toggle service selection
  const toggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Calculate total services cost
  const totalServicesCost = useMemo(() => {
    return selectedServices.reduce((sum, sId) => {
      const s = TECHNICIAN_SERVICES.find((item) => item.id === sId);
      return sum + (s ? s.price : 0);
    }, 0);
  }, [selectedServices]);

  const openBookTechnician = (tech) => {
    setSelectedTechnician(tech);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();

    if (!customerPhone || customerPhone.length < 10) {
      toast.error("Please enter a valid Dhaka phone number for technician confirmation.");
      return;
    }

    const currentAreaObj = DHAKA_AREAS.find((a) => a.id === selectedArea);
    const chosenServiceNames = selectedServices
      .map((id) => TECHNICIAN_SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean);

    const bookingData = {
      type: "technician",
      title: `${selectedTechnician ? selectedTechnician.trade : "Apartment Setup"} in ${currentAreaObj?.name || selectedArea}`,
      technicianName: selectedTechnician ? selectedTechnician.name : "Verified Dhaka Pro",
      technicianPhone: selectedTechnician ? selectedTechnician.phone : "+880 1711-000000",
      area: currentAreaObj?.name || selectedArea,
      newApartmentAddress: newApartmentAddress || `${currentAreaObj?.name}, Dhaka`,
      services: chosenServiceNames.length > 0 ? chosenServiceNames : ["General Equipment & Wiring Setup"],
      totalFare: totalServicesCost > 0 ? totalServicesCost : 1500,
      scheduledDate: scheduledDate || "Flexible (Tomorrow)",
      scheduledTime,
      contactName: customerName || "Apartment Resident",
      contactPhone,
      notes,
      status: "Confirmed"
    };

    const saved = saveBooking(bookingData);

    if (saved) {
      setBookingModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Technician Appointment Confirmed!",
        html: `
          <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <p><strong>Booking ID:</strong> <span style="color:#0284c7;">${saved.id}</span></p>
            <p><strong>Technician:</strong> ${bookingData.technicianName} (${selectedTechnician?.trade || "Setup Expert"})</p>
            <p><strong>Area:</strong> ${bookingData.area}</p>
            <p><strong>Scheduled:</strong> ${bookingData.scheduledDate} at ${bookingData.scheduledTime}</p>
            <p><strong>Total Estimate:</strong> <strong style="font-size: 16px; color:#16a34a;">৳${bookingData.totalFare.toLocaleString()} BDT</strong></p>
            <p style="margin-top: 10px; color: #64748b; font-size: 12px;">The technician carries all required drilling, testing tools, and brackets. Pay after work completion!</p>
          </div>
        `,
        confirmButtonText: "View My Bookings",
        showCancelButton: true,
        cancelButtonText: "Close"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/my-bookings");
        }
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FaSnowflake /> New Apartment Setup & Installation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Book AC & Electronics Technicians Near Your New Apartment
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Settling into your new Dhaka home? Book verified technicians living right near your neighborhood for quick AC installation, TV wall mounting, fan hanging, and furniture assembly.
          </p>
        </div>

        {/* Neighborhood Selector Bar */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <FaMapMarkerAlt size={22} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Where is your new apartment located in Dhaka?</p>
              <p className="text-xs text-slate-500">We will show verified technicians located right next to your building.</p>
            </div>
          </div>

          <div className="w-full md:w-72">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="select select-bordered w-full bg-slate-50 font-bold text-slate-800 border-slate-300"
            >
              {DHAKA_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name} ({area.zone})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 1: Services Checklist */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Select Essential Services Needed for New Apartment</h2>
              <p className="text-xs sm:text-sm text-slate-500">Pick what you want installed; technicians arrive equipped with drills and parts.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Selected total:</span>
              <span className="text-xl font-black text-blue-600">৳{totalServicesCost.toLocaleString()}</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 shadow-sm ring-1 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-2xl p-2 bg-slate-100 rounded-xl">{service.icon}</span>
                      <span className="text-base font-extrabold text-blue-700">৳{service.price}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{service.title}</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{service.unit}</span>
                    <span className={`font-bold flex items-center gap-1 ${isSelected ? "text-blue-600" : "text-slate-500"}`}>
                      {isSelected ? <><FaCheckCircle /> Added</> : "+ Select"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Verified Technicians Near The Chosen Area */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Verified Technicians Near {DHAKA_AREAS.find((a) => a.id === selectedArea)?.name || "Your Area"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Local vetted pros who can reach your new home within 30-45 minutes.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
              {filteredTechnicians.length} Technicians Available Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base truncate">{tech.name}</h3>
                        <FaUserCheck className="text-blue-500 text-xs flex-shrink-0" title="Verified Background Check" />
                      </div>
                      <p className="text-xs font-semibold text-blue-600">{tech.trade}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <FaStar /> {tech.rating}
                        </span>
                        <span>•</span>
                        <span>{tech.jobsCompleted}+ jobs</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                    <p className="text-slate-700">
                      <strong>Speciality:</strong> {tech.speciality}
                    </p>
                    <p className="text-slate-500 flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-emerald-500" /> Based in {tech.area} (~1-3 km from you)
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting from</span>
                    <span className="text-base font-extrabold text-slate-900">৳{tech.startingRate}</span>
                  </div>
                  <button
                    onClick={() => openBookTechnician(tech)}
                    className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-4 shadow-sm"
                  >
                    Book Technician
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Guarantee Banner */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">100% Damage Protection & Workmanship Guarantee</h3>
            <p className="text-sm text-slate-300">
              Every technician on Rent Apartment Dhaka is police-verified and certified. If anything isn't working perfectly within 7 days of installation, we send a senior engineer for free re-servicing.
            </p>
          </div>
          <button
            onClick={() => openBookTechnician(filteredTechnicians[0] || DHAKA_TECHNICIANS[0])}
            className="btn btn-warning text-slate-950 font-bold rounded-2xl px-6 py-3 whitespace-nowrap shadow-lg"
          >
            Quick Book for New Apartment
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Confirm Technician Booking</h3>
                <p className="text-xs text-slate-500">
                  {selectedTechnician?.name} • {selectedTechnician?.trade}
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-100 text-xs">
                <p className="font-bold text-blue-900 mb-1">Services to be performed:</p>
                <ul className="list-disc list-inside text-blue-800 space-y-0.5">
                  {selectedServices.map((id) => (
                    <li key={id}>{TECHNICIAN_SERVICES.find((s) => s.id === id)?.title}</li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-blue-200 flex justify-between font-bold text-blue-950">
                  <span>Estimated Service Total:</span>
                  <span>৳{totalServicesCost.toLocaleString()} BDT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="input input-sm input-bordered w-full text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="select select-sm select-bordered w-full text-xs font-medium"
                  >
                    <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="12:00 PM - 03:00 PM">Mid-Day (12:00 PM - 03:00 PM)</option>
                    <option value="03:00 PM - 06:00 PM">Afternoon (03:00 PM - 06:00 PM)</option>
                    <option value="06:00 PM - 09:00 PM">Evening (06:00 PM - 09:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sajjad Hossain"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dhaka Mobile Number (for technician call)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Apartment Full Address in Dhaka
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat 5-B, House 12, Road 7, Banani / Gulshan..."
                  value={newApartmentAddress}
                  onChange={(e) => setNewApartmentAddress(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Equipment details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Gree 1.5 ton inverter AC, 55-inch Sony TV, 10 ft ladder available in building..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="textarea textarea-bordered textarea-sm w-full text-xs"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="btn btn-sm btn-ghost text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 rounded-xl shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Technicians;
