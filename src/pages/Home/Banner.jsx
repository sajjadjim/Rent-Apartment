import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import banner1 from '../../assets/Build1.jpg';
import banner2 from '../../assets/Build2.jpg';
import banner3 from '../../assets/Build3.jpg';
import { FaBuilding, FaTruck, FaWrench, FaMapMarkerAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="bg-slate-900 py-3 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          autoPlay
          infiniteLoop
          interval={6000}
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          swipeable
          dynamicHeight={false}
        >
          {/* Slide 1: Rent Apartments in Dhaka */}
          <div className="relative">
            <img
              src={banner1}
              alt="Rent Apartments in Dhaka"
              className="object-cover h-[450px] md:h-[580px] w-full rounded-3xl brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-center p-6">
              <div className="text-white text-center max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                  <FaBuilding /> Dhaka City Rental Marketplace
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                  Rent Modern Apartments Across Dhaka City
                </h1>
                <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto">
                  Discover verified, premium apartments in Gulshan, Banani, Dhanmondi, Uttara, and Bashundhara with transparent leases and immediate move-in readiness.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    to="/apartments"
                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold border-none px-6 rounded-2xl shadow-lg shadow-blue-500/30"
                  >
                    Browse Dhaka Apartments
                  </Link>
                  <Link
                    to="/movers"
                    className="btn btn-outline text-white hover:bg-white hover:text-slate-900 border-white/80 font-bold px-6 rounded-2xl"
                  >
                    Calculate Shifting Fare
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: Distance-based House Shifting */}
          <div className="relative">
            <img
              src={banner2}
              alt="House Shifting and Truck Booking"
              className="object-cover h-[450px] md:h-[580px] w-full rounded-3xl brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-center p-6">
              <div className="text-white text-center max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                  <FaTruck /> Distance-Based Relocation
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                  Old to New Apartment Distance & Shifting Fare
                </h2>
                <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto">
                  Pick your old and new Dhaka locations to view live distance (KM) and fare. Choose Pickup, Mini Truck, or Covered Van with professional furniture organizers.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    to="/movers"
                    className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none px-6 rounded-2xl shadow-lg shadow-emerald-500/30"
                  >
                    Book Moving Truck & Helpers
                  </Link>
                  <Link
                    to="/technicians"
                    className="btn btn-outline text-white hover:bg-white hover:text-slate-900 border-white/80 font-bold px-6 rounded-2xl"
                  >
                    AC & Electronics Setup
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: New Apartment Technicians */}
          <div className="relative">
            <img
              src={banner3}
              alt="AC and Electronics Setup Technicians"
              className="object-cover h-[450px] md:h-[580px] w-full rounded-3xl brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-center p-6">
              <div className="text-white text-center max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                  <FaWrench /> Hassle-Free Move-in Setup
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                  AC, TV & Electronics Technicians Near Your House
                </h2>
                <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto">
                  Book verified neighborhood technicians for split AC installation, TV wall mounting, IPS setup, and furniture assembly on your moving day.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    to="/technicians"
                    className="btn btn-primary bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold border-none px-6 rounded-2xl shadow-lg shadow-amber-500/30"
                  >
                    Book Nearby Technicians
                  </Link>
                  <Link
                    to="/apartments"
                    className="btn btn-outline text-white hover:bg-white hover:text-slate-900 border-white/80 font-bold px-6 rounded-2xl"
                  >
                    Explore Apartments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
