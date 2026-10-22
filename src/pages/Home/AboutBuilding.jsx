import { motion } from "framer-motion";
import {
  FaBuilding,
  FaTruck,
  FaWrench,
  FaShieldAlt,
  FaMapMarkedAlt
} from "react-icons/fa";

const AboutBuilding = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-12 font-sans border-b border-slate-100">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FaShieldAlt /> Dhaka's Complete Relocation Ecosystem
        </motion.span>

        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-5 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome to Rent Apartment Dhaka
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="font-bold text-slate-900">Rent Apartment</span> is Dhaka City's premier all-in-one housing and relocation platform. We bridge the gap between finding your ideal apartment, calculating distance-based moving truck fares with professional furniture organizers, and booking verified neighborhood technicians for instant AC and electronics setup.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
          {[
            {
              icon: <FaBuilding size={26} className="text-blue-600" />,
              badge: "Rental Marketplace",
              title: "Verified Dhaka Flats",
              desc: "100% physically inspected apartments across Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, and Mirpur with genuine rental rates and transparent landlord agreements."
            },
            {
              icon: <FaTruck size={26} className="text-emerald-600" />,
              badge: "Moving & Shifting",
              title: "Distance Fare & Helpers",
              desc: "Calculates real road distance in KM between old and new flats. Book covered vans, mini trucks, and moving helpers who carefully pack, lift, and organize furniture in your new rooms."
            },
            {
              icon: <FaWrench size={26} className="text-amber-500" />,
              badge: "Setup & Technicians",
              title: "AC & Electronics Booking",
              desc: "Schedule certified technicians stationed right near your new apartment for split AC installation, TV wall mounting, fan hanging, and furniture assembly on your move-in day."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-50 p-7 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.15 }}
            >
              <div className="p-3 bg-white rounded-2xl w-fit shadow-sm mb-4">
                {item.icon}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                {item.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
