import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaGoogle, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import useAxios from "../../hooks/useAxios";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admiN123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();

  const from = location.state?.from?.pathname || "/";

  const saveUserToDB = async (user) => {
    try {
      await axios.post("/users", {
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL || ""
      });
    } catch (err) {
      console.log("DB sync notice:", err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await signIn(email, password);

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        toast.success("Welcome back, Administrator!");
        navigate("/dashboard/admin/profile");
      } else {
        toast.success(`Welcome back, ${res.user.displayName || res.user.email}!`);
        await saveUserToDB(res.user);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      let errorMsg = "Login failed. Please verify your email and password.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        errorMsg = "Incorrect email or password. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        errorMsg = "No account found with this email. Please register first.";
      } else if (err.code === "auth/too-many-requests") {
        errorMsg = "Too many failed attempts. Please reset password or try later.";
      }
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const res = await signInWithGoogle();
      toast.success(`Welcome to Rent Apartment, ${res.user.displayName}!`);
      await saveUserToDB(res.user);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message || "Google sign-in failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 sm:p-10 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <FaBuilding size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome to Rent Apartment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sign in with your Google account or email & password
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="btn w-full bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-300 rounded-2xl py-3 flex items-center justify-center gap-3 shadow-sm transition-all text-sm mb-6"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs uppercase font-bold text-slate-400">
              or sign in with email
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaEnvelope className="text-slate-400" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaLock className="text-slate-400" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/25 border-none text-sm transition mt-2"
            >
              {isSubmitting ? "Signing in..." : "Sign In to Rent Apartment"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-xs text-center text-slate-600 mt-6 pt-4 border-t border-slate-100">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
