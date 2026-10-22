import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { getBookings, cancelBooking } from "../../utils/bookingStore";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaTruck,
  FaWrench,
  FaBuilding,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPlus,
  FaBoxOpen
} from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this Booking?",
      text: "Are you sure you want to cancel this booking? Our team will be notified.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking(id);
        setBookings(getBookings());
        toast.success("Booking cancelled successfully.");
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Bookings & Orders</h1>
            <p className="text-sm text-slate-600 mt-1">
              Track your Dhaka apartment agreements, house shifting trucks, and technician installations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/movers"
              className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-bold flex items-center gap-1.5"
            >
              <FaPlus size={11} /> Book Mover
            </Link>
            <Link
              to="/technicians"
              className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5"
            >
              <FaPlus size={11} /> Book Technician
            </Link>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaBoxOpen />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Active Bookings Yet</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              You haven't booked any apartments, moving trucks, or technicians yet. Explore our verified Dhaka services!
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/apartments" className="btn btn-sm btn-primary bg-blue-600 text-white rounded-xl">
                Browse Apartments
              </Link>
              <Link to="/movers" className="btn btn-sm btn-outline rounded-xl">
                Calculate Shifting Fare
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const isMover = booking.type === "mover";
              const isTechnician = booking.type === "technician";
              const isConfirmed = booking.status === "Confirmed";

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-3 rounded-2xl text-xl ${
                          isMover
                            ? "bg-blue-50 text-blue-600"
                            : isTechnician
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {isMover ? <FaTruck /> : isTechnician ? <FaWrench /> : <FaBuilding />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">ID: {booking.id}</span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              isConfirmed
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">{booking.title}</h2>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400 block">Total Payable</span>
                      <span className="text-2xl font-black text-slate-900">
                        ৳{booking.totalFare?.toLocaleString() || "0"} BDT
                      </span>
                    </div>
                  </div>

                  {/* Booking details body */}
                  <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* Schedule */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs block">Schedule & Time</span>
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-blue-500" /> {booking.scheduledDate}
                      </p>
                      {booking.scheduledTime && (
                        <p className="text-slate-500 flex items-center gap-1.5">
                          <FaClock className="text-slate-400" /> {booking.scheduledTime}
                        </p>
                      )}
                    </div>

                    {/* Service / Vehicle details */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs block">
                        {isMover ? "Vehicle & Labor" : "Assigned Pro & Service"}
                      </span>
                      {isMover ? (
                        <>
                          <p className="font-bold text-slate-800">{booking.vehicle}</p>
                          <p className="text-slate-500">
                            {booking.helpersCount} Professional Moving Helpers • {booking.distanceKm} km
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-slate-800">{booking.technicianName}</p>
                          <p className="text-slate-500">{booking.services?.join(", ")}</p>
                        </>
                      )}
                    </div>

                    {/* Location & Contact */}
                    <div className="space-y-1">
                      <span className="text-slate-400 text-xs block">Contact & Address</span>
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <FaPhoneAlt className="text-emerald-500" /> {booking.contactPhone} ({booking.contactName})
                      </p>
                      <p className="text-slate-500 flex items-center gap-1.5 truncate">
                        <FaMapMarkerAlt className="text-red-500" />{" "}
                        {booking.dropoffAddress || booking.newApartmentAddress || booking.toArea || "Dhaka"}
                      </p>
                    </div>
                  </div>

                  {/* Items or note snippet if mover */}
                  {isMover && booking.items && booking.items.length > 0 && (
                    <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                      <span className="font-bold text-slate-700">Goods Carried: </span>
                      <span className="text-slate-600">{booking.items.join(" • ")}</span>
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      {isConfirmed && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="btn btn-xs btn-ghost text-red-600 hover:bg-red-50 font-bold"
                        >
                          Cancel Booking
                        </button>
                      )}
                      <a
                        href={`tel:${booking.technicianPhone || "+8801711234567"}`}
                        className="btn btn-xs btn-outline rounded-lg text-slate-700 font-bold"
                      >
                        Call Support / Driver
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
