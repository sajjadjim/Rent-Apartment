import React from 'react';
import Banner from '../Home/Banner';
import AboutBuilding from '../Home/AboutBuilding';
import MoversSection from '../Home/MoversSection';
import ApartmentSection from '../Home/ApartmentSection';
import TechniciansSection from '../Home/TechniciansSection';
import DhakaCoverageSection from '../Home/DhakaCoverageSection';
import AboutUs from '../Home/AboutUs';
import LocationDetails from '../Home/LocationDetails';
import CouponSection from '../Home/CouponSection';
import Reviews from '../Home/Review';
import Contact from '../Home/Contact';

const MainLayout = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Banner />
            <AboutBuilding />
            <MoversSection />
            <ApartmentSection />
            <TechniciansSection />
            <DhakaCoverageSection />
            <AboutUs />
            <LocationDetails />
            <CouponSection />
            <Reviews />
            <Contact />
        </div>
    );
};

export default MainLayout;