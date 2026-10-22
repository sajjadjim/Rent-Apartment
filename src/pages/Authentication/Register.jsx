import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage, FaBuilding } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // 1. Create user in Firebase
      const result = await createUser(data.email, data.password);
      
      // 2. Update Firebase display name & photo
      try {
        await updateUserProfile(data.name, data.photoURL);
      } catch (e) {
        console.log("Profile update warning:", e);
      }

      // 3. Save user to database
      const savedUser = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      };

      try {
        await axios.post('https://blockwise-server.vercel.app/users', savedUser, { timeout: 3000 });
      } catch (e) {
        console.log("DB sync notice:", e.message);
      }

      toast.success('Registration successful! Welcome to Rent Apartment.');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please use at least 6 characters.');
      } else {
        toast.error(error.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      const res = await signInWithGoogle();
      toast.success(`Welcome to Rent Apartment, ${res.user.displayName}!`);
      try {
        await axios.post('https://blockwise-server.vercel.app/users', {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL
        }, { timeout: 3000 });
      } catch (e) {
        console.log("DB sync notice:", e);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message || 'Google signup failed');
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
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join Rent Apartment Dhaka to book flats, moving trucks & technicians
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="btn w-full bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-300 rounded-2xl py-3 flex items-center justify-center gap-3 shadow-sm transition-all text-sm mb-6"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Sign Up with Google
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs uppercase font-bold text-slate-400">
              or register with email
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaUser className="text-slate-400" /> Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="e.g. Sajjad Hossain"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaEnvelope className="text-slate-400" /> Email Address
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaImage className="text-slate-400" /> Profile Photo URL (Optional)
              </label>
              <input
                type="text"
                {...register('photoURL')}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FaLock className="text-slate-400" /> Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="input input-bordered w-full rounded-xl bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white"
                placeholder="At least 6 characters"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/25 border-none text-sm transition mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-xs text-center text-slate-600 mt-6 pt-4 border-t border-slate-100">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
