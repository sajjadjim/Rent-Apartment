import { Link, useLocation } from "react-router";
import { FaSignOutAlt, FaBars, FaTruck, FaWrench, FaBuilding, FaClipboardList } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";
import logo from "../../src/assets/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useUserInfo();
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "member"
      ? "/dashboard/member"
      : "/dashboard/user";

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 px-4 md:px-12 font-sans transition-all">
      {/* Left - Logo & Brand */}
      <div className="navbar-start">
        <Link
          to="/"
          className="normal-case text-xl flex items-center gap-2.5 font-black text-slate-900 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <FaBuilding size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="tracking-tight text-lg sm:text-xl font-extrabold text-slate-900">
                Rent <span className="text-blue-600">Apartment</span>
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
              Dhaka Movers & Living
            </span>
          </div>
        </Link>
      </div>

      {/* Center - Menu (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-1 text-sm font-semibold text-slate-700">
          <li>
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive("/") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/apartments"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive("/apartments") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Rent Apartments
            </Link>
          </li>
          <li>
            <Link
              to="/movers"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive("/movers") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FaTruck className="text-blue-500 text-xs" />
              Moving & Fare
            </Link>
          </li>
          <li>
            <Link
              to="/technicians"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive("/technicians") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FaWrench className="text-emerald-500 text-xs" />
              Technicians & Setup
            </Link>
          </li>
          <li>
            <Link
              to="/my-bookings"
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                isActive("/my-bookings") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FaClipboardList className="text-purple-500 text-xs" />
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive("/about") ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* Right - Auth + Mobile Dropdown */}
      <div className="navbar-end flex items-center gap-2">
        {/* Mobile Menu Toggle */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-slate-700">
            <FaBars size={18} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-xl bg-white border border-slate-200 rounded-2xl w-64 space-y-1 font-medium"
          >
            <li>
              <Link to="/" className="font-bold">Home</Link>
            </li>
            <li>
              <Link to="/apartments">Rent Apartments</Link>
            </li>
            <li>
              <Link to="/movers" className="flex items-center gap-2">
                <FaTruck className="text-blue-500" /> Moving & Truck Fare
              </Link>
            </li>
            <li>
              <Link to="/technicians" className="flex items-center gap-2">
                <FaWrench className="text-emerald-500" /> Technicians & Setup
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="flex items-center gap-2">
                <FaClipboardList className="text-purple-500" /> My Bookings
              </Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {user && !loading && (
              <>
                <div className="divider my-1"></div>
                <li>
                  <Link to="/addReview">Add Review</Link>
                </li>
                <li>
                  <Link to={dashboardPath}>Dashboard</Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <div className="divider my-1"></div>
                <li>
                  <Link to="/login" className="text-blue-600 font-bold">
                    Login / Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Auth (Desktop + Avatar) */}
        {!user ? (
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-sm btn-ghost text-slate-700 hover:bg-slate-100 rounded-xl font-bold"
            >
              Sign In
            </Link>
            <Link
              to="/apartments"
              className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-4 shadow-sm"
            >
              Rent Apartment
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-blue-500/30"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "/src/assets/user.png"}
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-xl bg-white border border-slate-200 rounded-2xl w-56 space-y-1"
            >
              <li className="pr-4 text-slate-900 font-bold border-b border-slate-100 pb-2 mb-1 pointer-events-none">
                {user.displayName || "Resident"}
                <span className="text-[10px] block font-normal text-slate-400">{user.email}</span>
              </li>
              <li>
                <Link to="/my-bookings">My Bookings</Link>
              </li>
              {!loading && (
                <>
                  <li>
                    <Link to={dashboardPath}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/addReview">Add Review</Link>
                  </li>
                </>
              )}
              <li className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 font-bold"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
