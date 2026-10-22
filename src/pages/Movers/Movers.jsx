import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  DHAKA_AREAS,
  calculateDhakaDistance,
  VEHICLE_TYPES,
  HOME_ACCESSORIES_LIST
} from "../../data/dhakaData";
import { saveBooking } from "../../utils/bookingStore";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaRoute,
  FaUsers,
  FaBoxOpen,
  FaCheckCircle,
  FaShieldAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaInfoCircle
} from "react-icons/fa";

const Movers = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(routerLocation.search);
  const initialTo = searchParams.get("to") || "banani";

  // Form states
  const [fromArea, setFromArea] = useState("dhanmondi");
  const [toArea, setToArea] = useState(initialTo);
  const [selectedVehicle, setSelectedVehicle] = useState("mini_truck_15ton");
  const [helpersCount, setHelpersCount] = useState(2);
  const [selectedItems, setSelectedItems] = useState(["sofa", "master_bed", "refrigerator", "dining_table"]);
  const [needPackingMaterials, setNeedPackingMaterials] = useState(true);
  const [floorLevel, setFloorLevel] = useState("Lift Available");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("09:00 AM - 12:00 PM");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Calculate distance & route info
  const routeInfo = useMemo(() => {
    return calculateDhakaDistance(fromArea, toArea);
  }, [fromArea, toArea]);

  // Selected vehicle object
  const currentVehicle = useMemo(() => {
    return VEHICLE_TYPES.find((v) => v.id === selectedVehicle) || VEHICLE_TYPES[1];
  }, [selectedVehicle]);

  // Calculate total item points for vehicle recommendation
  const totalItemPoints = useMemo(() => {
    return selectedItems.reduce((acc, itemId) => {
      const item = HOME_ACCESSORIES_LIST.find((i) => i.id === itemId);
      return acc + (item ? item.points : 0);
    }, 0);
  }, [selectedItems]);

  // Recommended vehicle
  const recommendedVehicleId = useMemo(() => {
    if (totalItemPoints <= 4) return "pickup_1ton";
    if (totalItemPoints <= 11) return "mini_truck_15ton";
    if (totalItemPoints <= 20) return "covered_van_3ton";
    return "large_truck_5ton";
  }, [totalItemPoints]);

  // Toggle item
  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Fare calculations
  const distanceFare = Math.round(routeInfo.distance * currentVehicle.perKmRate);
  const helperFare = helpersCount * 650; // BDT 650 per moving organizer
  const packingFare = needPackingMaterials ? 950 : 0; // Bubble wrap, heavy stretch film & 10 cartons
  const subtotal = currentVehicle.baseFare + distanceFare + helperFare + packingFare;
  const discount = 200; // Welcome promotional discount
  const totalFare = Math.max(0, subtotal - discount);

  const handleBookNow = (e) => {
    e.preventDefault();

    if (!customerPhone || customerPhone.length < 10) {
      toast.error("Please enter a valid Dhaka phone number for driver confirmation.");
      return;
    }

    const fromAreaObj = DHAKA_AREAS.find((a) => a.id === fromArea);
    const toAreaObj = DHAKA_AREAS.find((a) => a.id === toArea);

    const bookingData = {
      type: "mover",
      title: `Shifting: ${fromAreaObj?.name || fromArea} to ${toAreaObj?.name || toArea}`,
      fromArea: fromAreaObj?.name || fromArea,
      toArea: toAreaObj?.name || toArea,
      pickupAddress: pickupAddress || `${fromAreaObj?.name}, Dhaka`,
      dropoffAddress: dropoffAddress || `${toAreaObj?.name}, Dhaka`,
      distanceKm: routeInfo.distance,
      transitTime: routeInfo.time,
      vehicle: currentVehicle.name,
      helpersCount,
      needPackingMaterials,
      floorLevel,
      totalFare,
      scheduledDate: scheduledDate || "Flexible (Within 48 hrs)",
      scheduledTime,
      contactName: customerName || "Valued Customer",
      contactPhone,
      specialInstructions,
      items: selectedItems.map((id) => HOME_ACCESSORIES_LIST.find((i) => i.id === id)?.label).filter(Boolean)
    };

    const saved = saveBooking(bookingData);

    if (saved) {
      Swal.fire({
        icon: "success",
        title: "Moving Truck & Helpers Booked!",
        html: `
          <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <p><strong>Booking ID:</strong> <span style="color:#0284c7;">${saved.id}</span></p>
            <p><strong>Route:</strong> ${bookingData.fromArea} ➔ ${bookingData.toArea} (${routeInfo.distance} km)</p>
            <p><strong>Vehicle:</strong> ${currentVehicle.name}</p>
            <p><strong>Helpers / Organizers:</strong> ${helpersCount} Persons</p>
            <p><strong>Total Fare:</strong> <strong style="font-size: 16px; color:#16a34a;">৳${totalFare.toLocaleString()} BDT</strong></p>
            <p style="margin-top: 10px; color: #64748b; font-size: 12px;">Our verified moving coordinator will call your phone <strong>${customerPhone}</strong> within 15 minutes to confirm GPS pickup time.</p>
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
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <FaTruck /> Dhaka Shifting & Furniture Moving Service
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Distance-Based House Shifting & Truck Booking
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Moving to a new apartment in Dhaka? Select your old and new apartment locations to calculate the exact distance, choose the right vehicle, and book professional furniture organizers.
          </p>
        </div>

        {/* Step Indicator Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Select Dhaka Route</p>
              <p className="text-xs text-slate-500">Old to New Apartment Distance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Choose Truck & Helpers</p>
              <p className="text-xs text-slate-500">Pickup, Covered Van & Organizers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Confirm & Settle</p>
              <p className="text-xs text-slate-500">Transparent Fare & Fast Move</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Calculator (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Distance & Route Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <FaRoute size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 1: Set Dhaka Locations & Distance</h2>
                  <p className="text-xs sm:text-sm text-slate-500">Fares are dynamically calculated based on road kilometers in Dhaka.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* From Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-red-500" /> Old Apartment (Pickup Area)
                  </label>
                  <select
                    value={fromArea}
                    onChange={(e) => setFromArea(e.target.value)}
                    className="select select-bordered w-full bg-slate-50 border-slate-300 focus:border-blue-500 font-medium"
                  >
                    {DHAKA_AREAS.map((area) => (
                      <option key={`from-${area.id}`} value={area.id}>
                        {area.name} ({area.zone})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Specific house, road, block in old apartment..."
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="input input-sm input-bordered w-full mt-2 bg-white text-xs"
                  />
                </div>

                {/* To Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-emerald-500" /> New Apartment (Drop-off Area)
                  </label>
                  <select
                    value={toArea}
                    onChange={(e) => setToArea(e.target.value)}
                    className="select select-bordered w-full bg-slate-50 border-slate-300 focus:border-blue-500 font-medium"
                  >
                    {DHAKA_AREAS.map((area) => (
                      <option key={`to-${area.id}`} value={area.id}>
                        {area.name} ({area.zone})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Specific house, road, block in new apartment..."
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    className="input input-sm input-bordered w-full mt-2 bg-white text-xs"
                  />
                </div>
              </div>

              {/* Live Distance Gauge */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 p-4 sm:p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white px-4 py-2.5 rounded-xl shadow-sm border border-blue-200">
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                      {routeInfo.distance}
                    </span>
                    <span className="text-xs block text-slate-500 font-semibold">KM Distance</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <FaClock className="text-blue-500" /> Approx. {routeInfo.time}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{routeInfo.routeNote}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    GPS Tracked Dhaka Fleet
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Vehicle Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <FaTruck size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Step 2: Choose Carrying Vehicle</h2>
                    <p className="text-xs sm:text-sm text-slate-500">Pick the vehicle type that best fits your furniture and boxes.</p>
                  </div>
                </div>
                {recommendedVehicleId && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg">
                    Recommended for your items
                  </span>
                )}
              </div>

              <div className="space-y-3.5">
                {VEHICLE_TYPES.map((vehicle) => {
                  const isSelected = selectedVehicle === vehicle.id;
                  const isRecommended = recommendedVehicleId === vehicle.id;
                  const estimatedCost = vehicle.baseFare + Math.round(routeInfo.distance * vehicle.perKmRate);

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <span className="text-3xl p-2 bg-slate-100 rounded-xl">{vehicle.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-slate-900 text-base">{vehicle.name}</h3>
                              {isRecommended && (
                                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                  Best Match
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{vehicle.tagline}</p>
                            <p className="text-[11px] text-slate-400 mt-1">
                              <strong>Fits:</strong> {vehicle.recommendedFor} • <strong>Cap:</strong> {vehicle.capacity}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                          <p className="text-lg font-extrabold text-slate-900">৳{estimatedCost.toLocaleString()}</p>
                          <p className="text-[11px] text-slate-500">
                            Base ৳{vehicle.baseFare} + ৳{vehicle.perKmRate}/km
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Labor & Organizers Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <FaUsers size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Step 3: Moving Helpers & Furniture Organizers</h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    How many people do you need to pack, carry, load, and organize furniture in your new home?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setHelpersCount(num)}
                    className={`py-3 px-2 rounded-xl text-center font-bold transition-all border-2 ${
                      helpersCount === num
                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-lg">{num} Person{num > 1 ? "s" : ""}</span>
                    <span className="text-[11px] opacity-80 block font-normal">৳{num * 650}</span>
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <FaCheckCircle className="text-emerald-500" /> What your {helpersCount} helpers will do:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                  <li>Carefully wrap, load and secure furniture into the truck at old apartment.</li>
                  <li>Unload and carry everything upstairs/elevator safely at new apartment.</li>
                  <li>Unpack boxes and organize master bed, sofa, dining table, and wardrobe in their exact rooms!</li>
                </ul>
              </div>

              {/* Floor / Elevator condition */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Elevator / Lift Status</label>
                  <select
                    value={floorLevel}
                    onChange={(e) => setFloorLevel(e.target.value)}
                    className="select select-bordered select-sm w-full bg-white font-medium"
                  >
                    <option value="Lift Available">Lift / Elevator Working at both places</option>
                    <option value="1st to 3rd Floor Stairs">1st - 3rd Floor by Stairs (No Lift)</option>
                    <option value="4th Floor+ Stairs">4th Floor+ by Stairs (Heavy Carrying)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Protective Packing Kit</label>
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      checked={needPackingMaterials}
                      onChange={(e) => setNeedPackingMaterials(e.target.checked)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Include Bubble Wrap, Tape & 10 Carton Boxes (+৳950)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4. Home Accessories & Furniture Checklist */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <FaBoxOpen size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Step 4: Home Accessories & Goods Checklist</h2>
                    <p className="text-xs sm:text-sm text-slate-500">Check off what needs to be transported so our driver arrives prepared.</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200">
                  {selectedItems.length} Items Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HOME_ACCESSORIES_LIST.map((item) => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-blue-50/70 border-blue-400 text-slate-900 font-medium"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="checkbox checkbox-primary checkbox-sm"
                      />
                      <span className="text-xs flex-1">{item.label}</span>
                      <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.category}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Fare Breakdown & Booking Confirmation (5 cols sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Transparent Dhaka Pricing
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Fare Summary & Booking</h3>
                <p className="text-xs text-slate-500">No hidden charges. Standard fuel and toll inclusive.</p>
              </div>

              {/* Route snippet */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">From:</span>
                  <span className="font-bold text-slate-800">{DHAKA_AREAS.find((a) => a.id === fromArea)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">To:</span>
                  <span className="font-bold text-slate-800">{DHAKA_AREAS.find((a) => a.id === toArea)?.name}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Total Distance:</span>
                  <span className="font-extrabold text-blue-600">{routeInfo.distance} KM (~{routeInfo.time})</span>
                </div>
              </div>

              {/* Line item costs */}
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Vehicle Base Fare ({currentVehicle.name.split("(")[0]}):</span>
                  <span className="font-semibold text-slate-900">৳{currentVehicle.baseFare}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Distance Fare ({routeInfo.distance} km × ৳{currentVehicle.perKmRate}):</span>
                  <span className="font-semibold text-slate-900">৳{distanceFare}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{helpersCount} Furniture Organizers / Laborers:</span>
                  <span className="font-semibold text-slate-900">৳{helperFare}</span>
                </div>
                {needPackingMaterials && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Packing Boxes & Bubble Film:</span>
                    <span className="font-semibold text-slate-900">৳{packingFare}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Online Booking Voucher:</span>
                  <span>-৳{discount}</span>
                </div>

                <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900 block">Total Estimated Fare</span>
                    <span className="text-[11px] text-slate-500">Pay cash/bKash after safe dropoff</span>
                  </div>
                  <span className="text-3xl font-black text-blue-600">৳{totalFare.toLocaleString()}</span>
                </div>
              </div>

              {/* Booking Input Form */}
              <form onSubmit={handleBookNow} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Moving Date</label>
                    <input
                      type="date"
                      required
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="input input-sm input-bordered w-full text-xs bg-slate-50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                    <select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="select select-sm select-bordered w-full text-xs bg-slate-50 font-medium"
                    >
                      <option value="07:00 AM - 10:00 AM">Morning (07:00 AM - 10:00 AM)</option>
                      <option value="10:00 AM - 01:00 PM">Mid-Day (10:00 AM - 01:00 PM)</option>
                      <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
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
                    Dhaka Mobile Number (for driver & helper coordination)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX / 018XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="input input-sm input-bordered w-full text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Shifting Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Fragile glass table, narrow stair gate, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="textarea textarea-bordered textarea-sm w-full text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/25 border-none text-sm transition-all"
                >
                  Confirm Shifting Truck & Helpers Booking (৳{totalFare.toLocaleString()})
                </button>
              </form>

              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><FaShieldAlt className="text-emerald-500" /> Goods Safety Assured</span>
                <span>•</span>
                <span>Zero Advance Deposit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movers;
