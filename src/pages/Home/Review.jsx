import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Tanvir Rahman",
    role: "Moved from Dhanmondi to Banani",
    text: "Rent Apartment saved us so much stress! We found a beautiful 3-BHK in Banani, calculated the 10.8 km distance fare, and booked a 14ft Covered Van with 3 helpers. They even arranged our furniture in each room!",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    tag: "Mover & Apartment"
  },
  {
    name: "Dr. Farhana Yasmin",
    role: "Resident in Gulshan 2",
    text: "Booking the AC technician through this site was effortless. Rafiqul arrived within an hour of moving into our new flat, installed two inverter ACs, mounted our TV, and checked all switchboards safely.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    tag: "AC & Electronics"
  },
  {
    name: "Mahmudul Hasan",
    role: "Moved from Uttara to Bashundhara",
    text: "The distance fare calculator is 100% transparent. No haggling with truck drivers on the street in Dhaka. The 2 helpers carried our heavy king bed up to the 6th floor without a scratch.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    tag: "Truck & Helpers"
  },
];

const Reviews = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-16 font-sans border-b border-slate-100">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
          Dhaka Residents Community
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          What Dhaka Renters & Movers Say
        </h2>
        <p className="text-slate-600 mt-2 text-base">
          Over 2,400+ Dhaka families have rented apartments, moved home goods, and installed appliances through Rent Apartment.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-amber-400 text-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  {review.tag}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
              <img
                src={review.img}
                alt={review.name}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-300"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {review.name}
                </h4>
                <span className="text-xs text-slate-500">{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
