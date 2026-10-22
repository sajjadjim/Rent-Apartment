import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import { DHAKA_APARTMENTS, DHAKA_AREAS } from "../../data/dhakaData";
import { saveBooking } from "../../utils/bookingStore";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaBuilding,
  FaTruck,
  FaWrench,
  FaFilter,
  FaCheckCircle,
  FaPhoneAlt
} from "react-icons/fa";

const Apartments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apartments, setApartments] = useState(DHAKA_APARTMENTS);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedBhk, setSelectedBhk] = useState("all");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [refreshRole, setRefreshRole] = useState(0);
  const { role } = useUserInfo(refreshRole);

  // Agreement modal state
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [agreementName, setAgreementName] = useState("");
  const [agreementPhone, setAgreementPhone] = useState("");
  const [agreementMoveInDate, setAgreementMoveInDate] = useState("");

  useEffect(() => {
    // Try to fetch from API, but gracefully fallback to DHAKA_APARTMENTS
    const fetchApts = async () => {
      try {
        const res = await axios.get("https://blockwise-server.vercel.app/apartments", { timeout: 3500 });
        if (res.data?.apartments && res.data.apartments.length > 0) {
          // Merge or format with Dhaka data
          const apiApts = res.data.apartments.map((apt, idx) => ({
            ...apt,
            areaName: apt.blockName?.includes("Gulshan")
              ? "Gulshan"
              : apt.blockName?.includes("Banani")
              ? "Banani"
              : apt.blockName?.includes("Uttara")
              ? "Uttara"
              : "Dhaka Central",
            areaId: "gulshan",
            bedrooms: apt.floorNo > 5 ? 3 : 2,
            bathrooms: 2,
            sizeSqft: 1400,
            apartmentImage: apt.apartmentImage || DHAKA_APARTMENTS[idx % DHAKA_APARTMENTS.length].apartmentImage
          }));
          // Combine API apartments with Dhaka apartments for rich selection
          setApartments([...DHAKA_APARTMENTS, ...apiApts]);
        } else {
          setApartments(DHAKA_APARTMENTS);
        }
      } catch (err) {
        // Fallback to our authentic Dhaka apartment dataset
        setApartments(DHAKA_APARTMENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchApts();
  }, []);

  // Filtered apartments logic
  const filteredApartments = useMemo(() => {
    return apartments.filter((apt) => {
      // Area filter
      if (selectedArea !== "all") {
        const areaNameMatch = apt.areaName?.toLowerCase().includes(selectedArea.toLowerCase());
        const areaIdMatch = apt.areaId === selectedArea;
        const blockMatch = apt.blockName?.toLowerCase().includes(selectedArea.toLowerCase());
        if (!areaNameMatch && !areaIdMatch && !blockMatch) return false;
      }

      // BHK filter
      if (selectedBhk !== "all") {
        if (Number(apt.bedrooms) !== Number(selectedBhk)) return false;
      }

      // Min rent filter
      if (minRent && Number(apt.rent) < Number(minRent)) {
        return false;
      }

      // Max rent filter
      if (maxRent && Number(apt.rent) > Number(maxRent)) {
        return false;
      }

      return true;
    });
  }, [apartments, selectedArea, selectedBhk, minRent, maxRent]);

  const openAgreementModal = (apt) => {
    setSelectedApartment(apt);
    setAgreementName(user?.displayName || "");
    setAgreementPhone("");
    setAgreementModalOpen(true);
  };

  const handleAgreementSubmit = async (e) => {
    e.preventDefault();

    if (!agreementPhone || agreementPhone.length < 10) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    const agreementData = {
      type: "apartment",
      title: `Rental Agreement: ${selectedApartment.title || `Apartment ${selectedApartment.apartmentNo}`}`,
      apartmentNo: selectedApartment.apartmentNo,
      floorNo: selectedApartment.floorNo,
      blockName: selectedApartment.blockName,
      rent: selectedApartment.rent,
      totalFare: selectedApartment.rent,
      email: user?.email || "resident@rentapartment.com",
      contactName: agreementName || "Resident",
      contactPhone: agreementPhone,
      scheduledDate: agreementMoveInDate || "Immediate",
      status: "Confirmed"
    };

    try {
      // Try posting to API
      await axios.post("https://blockwise-server.vercel.app/api/agreements", agreementData, { timeout: 3000 });
    } catch (err) {
      console.log("Local fallback for agreement application");
    }

    // Save to local storage for user tracking
    const saved = saveBooking(agreementData);
    setAgreementModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Apartment Application Submitted!",
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
          <p><strong>Apartment:</strong> ${selectedApartment.title || `Flat ${selectedApartment.apartmentNo}`}</p>
          <p><strong>Location:</strong> ${selectedApartment.blockName}</p>
          <p><strong>Monthly Rent:</strong> ৳${selectedApartment.rent.toLocaleString()} BDT</p>
          <p style="margin-top: 10px; color: #16a34a; font-weight: bold;">Application status: Confirmed & Pending Landlord Handover.</p>
          <p style="color: #64748b; font-size: 12px;">You can now book shifting trucks and technicians for this new apartment directly!</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Book Shifting Truck to this Flat",
      cancelButtonText: "View My Bookings"
    }).then((res) => {
      if (res.isConfirmed) {
        navigate(`/movers?to=${selectedApartment.areaId || "banani"}`);
      } else {
        navigate("/my-bookings");
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FaBuilding /> Dhaka City Rental Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Rent Modern Apartments in Dhaka City
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Discover verified apartments available in prime Dhaka locations including Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, and Mirpur. Complete your rental agreement, book moving trucks, and setup home electronics seamlessly.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm">
            <FaFilter className="text-blue-600" /> Filter Dhaka Apartments
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Dhaka Area */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Dhaka Neighborhood</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="select select-bordered select-sm w-full bg-slate-50 font-medium"
              >
                <option value="all">All Dhaka Areas</option>
                {DHAKA_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Bedrooms (BHK)</label>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="select select-bordered select-sm w-full bg-slate-50 font-medium"
              >
                <option value="all">Any Bedrooms</option>
                <option value="2">2 Bedrooms (2-BHK)</option>
                <option value="3">3 Bedrooms (3-BHK)</option>
                <option value="4">4+ Bedrooms (4-BHK)</option>
              </select>
            </div>

            {/* Min Rent */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Min Rent (৳ BDT)</label>
              <input
                type="number"
                placeholder="e.g. 20000"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                className="input input-bordered input-sm w-full bg-slate-50 font-medium"
              />
            </div>

            {/* Max Rent */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Max Rent (৳ BDT)</label>
              <input
                type="number"
                placeholder="e.g. 70000"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="input input-bordered input-sm w-full bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Showing <strong>{filteredApartments.length}</strong> available apartments in Dhaka</span>
            {(selectedArea !== "all" || selectedBhk !== "all" || minRent || maxRent) && (
              <button
                onClick={() => {
                  setSelectedArea("all");
                  setSelectedBhk("all");
                  setMinRent("");
                  setMaxRent("");
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Apartments Grid */}
        {filteredApartments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <FaBuilding className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Apartments Match Your Criteria</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your price range or exploring nearby Dhaka neighborhoods.
            </p>
            <button
              onClick={() => {
                setSelectedArea("all");
                setSelectedBhk("all");
                setMinRent("");
                setMaxRent("");
              }}
              className="btn btn-sm btn-primary bg-blue-600 text-white rounded-xl"
            >
              View All Apartments
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apt) => (
              <div
                key={apt._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Price Overlay */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={apt.apartmentImage}
                      alt={apt.title || `Apartment ${apt.apartmentNo}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-red-400" />
                      {apt.areaName || "Dhaka City"}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white font-extrabold text-sm px-3.5 py-1.5 rounded-xl shadow-lg">
                      ৳{apt.rent?.toLocaleString()} <span className="text-[10px] font-normal opacity-90">/month</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {apt.title || `Flat ${apt.apartmentNo}, ${apt.blockName}`}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <FaBuilding className="text-slate-400" /> {apt.blockName} • Floor {apt.floorNo} (Flat {apt.apartmentNo})
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-slate-700 text-xs">
                      <div className="flex items-center gap-1.5">
                        <FaBed className="text-blue-500" />
                        <span>{apt.bedrooms || 3} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaBath className="text-indigo-500" />
                        <span>{apt.bathrooms || 3} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaRulerCombined className="text-emerald-500" />
                        <span>{apt.sizeSqft || 1600} sqft</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {apt.description || "Spacious, well-ventilated apartment with all modern civic amenities in a secure building."}
                    </p>

                    {/* Amenities tags */}
                    {apt.amenities && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {apt.amenities.slice(0, 3).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => openAgreementModal(apt)}
                    className="btn btn-sm btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                  >
                    Apply for Rental Agreement
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to={`/movers?to=${apt.areaId || "banani"}`}
                      className="btn btn-xs btn-outline border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 rounded-lg flex items-center justify-center gap-1 font-semibold"
                    >
                      <FaTruck size={10} className="text-blue-600" /> Book Moving
                    </Link>
                    <Link
                      to={`/technicians?area=${apt.areaId || "gulshan"}`}
                      className="btn btn-xs btn-outline border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400 rounded-lg flex items-center justify-center gap-1 font-semibold"
                    >
                      <FaWrench size={10} className="text-emerald-600" /> Book Setup Pro
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agreement Modal */}
      {agreementModalOpen && selectedApartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Rental Agreement Application</h3>
                <p className="text-xs text-slate-500">
                  Flat {selectedApartment.apartmentNo} • {selectedApartment.blockName}
                </p>
              </div>
              <button
                onClick={() => setAgreementModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAgreementSubmit} className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Rent:</span>
                  <span className="font-extrabold text-slate-900">৳{selectedApartment.rent.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gas & Utilities:</span>
                  <span className="font-semibold text-slate-800">{selectedApartment.gasType || "Titas Line Gas"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Deposit:</span>
                  <span className="font-semibold text-slate-800">2 Months Rent (Standard Dhaka Lease)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sajjad Hossain"
                  value={agreementName}
                  onChange={(e) => setAgreementName(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dhaka Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={agreementPhone}
                  onChange={(e) => setAgreementPhone(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Move-in Date</label>
                <input
                  type="date"
                  required
                  value={agreementMoveInDate}
                  onChange={(e) => setAgreementMoveInDate(e.target.value)}
                  className="input input-sm input-bordered w-full text-xs font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAgreementModalOpen(false)}
                  className="btn btn-sm btn-ghost text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apartments;
