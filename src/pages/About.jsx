import image from './../assets/about.jpg';
import { FaBuilding, FaTruck, FaWrench, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative">
          <img
            src={image}
            alt="Rent Apartment Building in Dhaka"
            className="rounded-3xl h-[420px] w-full object-cover shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent rounded-3xl flex items-end p-6">
            <span className="text-white font-bold text-sm bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-md">
              Serving All Dhaka City Neighborhoods
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
            Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Rent Apartment Dhaka
          </h1>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            At <span className="font-bold text-slate-900">Rent Apartment</span>, we’re revolutionizing the Dhaka housing journey. Moving to a new home in Dhaka historically meant dealing with separate middle-men, bargaining with street truck drivers, finding labor on the street, and hunting for unknown electricians.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            We built a unified digital platform where residents can rent verified apartments in Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, and Mirpur; calculate road distance-based shifting truck fares with professional furniture organizers; and book certified AC and electronics technicians in one tap.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Transparent Dhaka Road Rates
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Verified Background Checked Pros
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Furniture Carrying & Organizing
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> 7-Day AC Installation Warranty
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
