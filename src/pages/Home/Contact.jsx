import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! Our Dhaka customer support team will contact you within 15 minutes.");
  };

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 md:px-16 font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Text Info */}
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            Dhaka Helpdesk & Support
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Get in Touch with Rent Apartment
          </h2>
          <p className="text-base text-slate-600 mb-6 leading-relaxed">
            Need help choosing a flat, planning your house shifting route, or scheduling technicians for moving day? Our Dhaka customer support and driver dispatch team is available 7 days a week.
          </p>
          <ul className="space-y-4 text-slate-700 text-sm">
            <li className="flex items-center gap-3">
              <span className="p-2 bg-white rounded-xl shadow-sm text-base">📍</span>
              <div>
                <strong>Headquarters:</strong>
                <p className="text-xs text-slate-500">Kemal Ataturk Avenue, Banani, Dhaka 1213, Bangladesh</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 bg-white rounded-xl shadow-sm text-base">📞</span>
              <div>
                <strong>Customer Hotline:</strong>
                <p className="text-xs text-slate-500">+880 1711-234567 / +880 1819-876543 (Dhaka Toll-Free)</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 bg-white rounded-xl shadow-sm text-base">📧</span>
              <div>
                <strong>Email Support:</strong>
                <p className="text-xs text-slate-500">support@rentapartment.com</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right - Form */}
        <div className="bg-white shadow-xl border border-slate-200/80 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sajjad Hossain"
                className="input input-bordered w-full text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dhaka Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                className="input input-bordered w-full text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Service Query
              </label>
              <select className="select select-bordered w-full text-xs font-medium">
                <option>Apartment Rental in Dhaka</option>
                <option>House Shifting & Truck Booking</option>
                <option>AC & Electronics Technician Setup</option>
                <option>Landlord Property Listing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Message / Details
              </label>
              <textarea
                rows="3"
                required
                placeholder="How can we assist your move in Dhaka?"
                className="textarea textarea-bordered w-full text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/25 border-none text-sm transition"
            >
              {submitted ? "Message Sent Successfully!" : "Send Message to Dhaka Support"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
