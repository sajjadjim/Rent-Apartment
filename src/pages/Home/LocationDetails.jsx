import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaSubway, FaRoad, FaCar, FaClock } from "react-icons/fa";

const LocationDetails = () => {
  const position = [23.8103, 90.4125]; // Central Dhaka, Bangladesh

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-12 font-sans border-b border-slate-200">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
          Connectivity & City Hubs
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Prime Dhaka City Locations & Commute
        </h2>
        <p className="text-slate-600 text-base max-w-3xl mx-auto mb-12">
          Our verified apartments and shifting hubs are strategically connected to major Dhaka expressways, Dhaka Metro Rail (MRT Line-6), and key diplomatic/business zones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "340px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <strong>Rent Apartment Dhaka HQ</strong> <br />
                  Connecting Gulshan, Banani, Dhanmondi & Uttara
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Directions Info */}
          <div className="text-left space-y-5">
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <FaMapMarkerAlt className="text-red-500 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Central Hub & Operations</h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Rent Apartment Operations Center, Kemal Ataturk Avenue, Banani, Dhaka 1213
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <FaSubway className="text-emerald-600 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Dhaka Metro Rail (MRT Line 6)</h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Direct connection from Uttara North to Motijheel via Mirpur, Farmgate & Dhaka University stations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <FaRoad className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Dhaka Elevated Expressway Access</h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Shifting trucks can bypass Airport Road traffic in 15 minutes to reach Farmgate, Tejgaon, and Banani.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <FaClock className="text-purple-600 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">24/7 Shifting Truck Entry Timing</h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Covered vans and mini trucks can move freely round-the-clock on inner Dhaka sector roads with no nighttime restriction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
