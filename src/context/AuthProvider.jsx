import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth, googleProvider } from '../Firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email and Password Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Email and Password Sign Up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update User Profile (Name & Photo)
  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return Promise.resolve();
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
    }).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    signIn,
    logOut,
    signInWithGoogle,
    createUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;