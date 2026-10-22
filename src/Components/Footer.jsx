import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaTruck,
  FaWrench
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <FaBuilding size={20} />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">
                Rent <span className="text-blue-500">Apartment</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                Dhaka Living & Shifting
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dhaka City's all-in-one housing ecosystem. Rent verified apartments, calculate distance-based house shifting fares with professional furniture organizers, and book AC/electronics setup technicians.
          </p>
          <div className="flex gap-3 text-sm pt-1">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-500 text-white flex items-center justify-center transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:text-white flex items-center justify-center transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Dhaka Services
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link to="/apartments" className="hover:text-blue-400 transition-colors">
                Rent Verified Apartments
              </Link>
            </li>
            <li>
              <Link to="/movers" className="hover:text-blue-400 transition-colors">
                House Shifting & Distance Fare
              </Link>
            </li>
            <li>
              <Link to="/movers" className="hover:text-blue-400 transition-colors">
                Book Moving Helpers & Organizers
              </Link>
            </li>
            <li>
              <Link to="/technicians" className="hover:text-blue-400 transition-colors">
                AC Master Installation & Service
              </Link>
            </li>
            <li>
              <Link to="/technicians" className="hover:text-blue-400 transition-colors">
                Smart TV Wall Mount & Electrician
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:text-blue-400 transition-colors">
                Track My Bookings & Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Dhaka Neighborhoods */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Coverage in Dhaka
          </h3>
          <ul className="space-y-2 text-xs text-slate-400 grid grid-cols-2 gap-x-2">
            <li>• Gulshan 1 & 2</li>
            <li>• Banani</li>
            <li>• Dhanmondi</li>
            <li>• Uttara (1-14)</li>
            <li>• Bashundhara</li>
            <li>• Mirpur DOHS</li>
            <li>• Mohammadpur</li>
            <li>• Baridhara</li>
            <li>• Mohakhali</li>
            <li>• Badda</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Dhaka Helpdesk
          </h3>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Kemal Ataturk Avenue, Banani, Dhaka 1213</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt className="text-emerald-500 flex-shrink-0" />
              <span>+880 1711-234567 / +880 1819-876543</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-amber-500 flex-shrink-0" />
              <span>support@rentapartment.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pt-8 border-t border-slate-800/80">
        © {new Date().getFullYear()} Rent Apartment. All rights reserved. Dhaka City Apartment Rental, Moving & Home Setup Ecosystem.
      </div>
    </footer>
  );
};

export default Footer;
