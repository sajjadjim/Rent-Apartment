// Dhaka City Data: Apartments, Areas, Distances, Movers Vehicles, and Technicians

export const DHAKA_AREAS = [
  { id: "gulshan", name: "Gulshan (1 & 2)", zone: "North-Central Dhaka", lat: 23.7925, lng: 90.4078 },
  { id: "banani", name: "Banani", zone: "North-Central Dhaka", lat: 23.7937, lng: 90.4066 },
  { id: "dhanmondi", name: "Dhanmondi", zone: "Central-South Dhaka", lat: 23.7465, lng: 90.3760 },
  { id: "uttara", name: "Uttara (Sectors 1-14)", zone: "North Dhaka", lat: 23.8759, lng: 90.3795 },
  { id: "bashundhara", name: "Bashundhara R/A", zone: "North-East Dhaka", lat: 23.8151, lng: 90.4255 },
  { id: "mirpur", name: "Mirpur (1, 2, 10, DOHS)", zone: "North-West Dhaka", lat: 23.8071, lng: 90.3686 },
  { id: "mohammadpur", name: "Mohammadpur", zone: "West Dhaka", lat: 23.7658, lng: 90.3585 },
  { id: "mohakhali", name: "Mohakhali & DOHS", zone: "Central Dhaka", lat: 23.7776, lng: 90.4005 },
  { id: "baridhara", name: "Baridhara & DOHS", zone: "North-East Dhaka", lat: 23.8042, lng: 90.4208 },
  { id: "badda", name: "Badda & Aftabnagar", zone: "East Dhaka", lat: 23.7806, lng: 90.4267 },
  { id: "shantinagar", name: "Shantinagar & Malibagh", zone: "Central-South Dhaka", lat: 23.7410, lng: 90.4120 },
  { id: "lalmatia", name: "Lalmatia", zone: "Central Dhaka", lat: 23.7547, lng: 90.3712 },
  { id: "nikunja", name: "Nikunja & Khilkhet", zone: "North Dhaka", lat: 23.8293, lng: 90.4197 },
  { id: "motijheel", name: "Motijheel & Paltan", zone: "South Dhaka", lat: 23.7330, lng: 90.4172 },
  { id: "old_dhaka", name: "Old Dhaka (Lalbagh/Wari)", zone: "South Dhaka", lat: 23.7126, lng: 90.4005 }
];

// Realistic road distance matrix (in km) between Dhaka key areas
const DHAKA_DISTANCE_MATRIX = {
  "gulshan-banani": 3.2,
  "gulshan-dhanmondi": 11.5,
  "gulshan-uttara": 13.8,
  "gulshan-bashundhara": 6.4,
  "gulshan-mirpur": 10.5,
  "gulshan-mohammadpur": 10.2,
  "gulshan-mohakhali": 3.8,
  "gulshan-baridhara": 2.5,
  "gulshan-badda": 4.1,
  "gulshan-shantinagar": 9.2,
  "gulshan-motijheel": 12.0,
  "gulshan-old_dhaka": 14.5,

  "banani-dhanmondi": 10.8,
  "banani-uttara": 12.5,
  "banani-bashundhara": 6.8,
  "banani-mirpur": 8.7,
  "banani-mohammadpur": 9.5,
  "banani-mohakhali": 2.4,
  "banani-baridhara": 3.6,
  "banani-badda": 5.2,
  "banani-shantinagar": 8.9,
  "banani-motijheel": 11.4,
  "banani-old_dhaka": 14.2,

  "dhanmondi-uttara": 21.0,
  "dhanmondi-bashundhara": 16.5,
  "dhanmondi-mirpur": 8.4,
  "dhanmondi-mohammadpur": 3.5,
  "dhanmondi-mohakhali": 8.5,
  "dhanmondi-baridhara": 14.2,
  "dhanmondi-badda": 12.4,
  "dhanmondi-shantinagar": 5.8,
  "dhanmondi-motijheel": 6.5,
  "dhanmondi-old_dhaka": 6.2,

  "uttara-bashundhara": 11.2,
  "uttara-mirpur": 13.4,
  "uttara-mohammadpur": 19.5,
  "uttara-mohakhali": 14.8,
  "uttara-baridhara": 12.6,
  "uttara-badda": 15.2,
  "uttara-shantinagar": 20.4,
  "uttara-motijheel": 23.5,
  "uttara-old_dhaka": 26.0,

  "bashundhara-mirpur": 14.8,
  "bashundhara-mohammadpur": 15.2,
  "bashundhara-mohakhali": 7.5,
  "bashundhara-baridhara": 4.0,
  "bashundhara-badda": 5.6,
  "bashundhara-shantinagar": 12.5,
  "bashundhara-motijheel": 15.0,
  "bashundhara-old_dhaka": 18.0,

  "mirpur-mohammadpur": 6.2,
  "mirpur-mohakhali": 8.2,
  "mirpur-baridhara": 12.5,
  "mirpur-badda": 13.5,
  "mirpur-shantinagar": 12.8,
  "mirpur-motijheel": 15.5,
  "mirpur-old_dhaka": 16.2,

  "mohammadpur-mohakhali": 7.9,
  "mohammadpur-baridhara": 13.8,
  "mohammadpur-badda": 12.8,
  "mohammadpur-shantinagar": 7.2,
  "mohammadpur-motijheel": 8.4,
  "mohammadpur-old_dhaka": 8.5,

  "mohakhali-baridhara": 4.8,
  "mohakhali-badda": 4.5,
  "mohakhali-shantinagar": 6.5,
  "mohakhali-motijheel": 9.2,
  "mohakhali-old_dhaka": 11.8,

  "baridhara-badda": 3.8,
  "baridhara-shantinagar": 11.0,
  "baridhara-motijheel": 13.5,
  "baridhara-old_dhaka": 16.0,

  "badda-shantinagar": 7.2,
  "badda-motijheel": 9.8,
  "badda-old_dhaka": 12.5,

  "shantinagar-motijheel": 2.8,
  "shantinagar-old_dhaka": 4.5,

  "motijheel-old_dhaka": 3.2
};

export const calculateDhakaDistance = (fromId, toId) => {
  if (!fromId || !toId) return { distance: 10, time: "30-45 mins", routeNote: "Standard Dhaka Route" };
  if (fromId === toId) return { distance: 3.5, time: "15-25 mins", routeNote: "Within same Dhaka zone / local trip" };

  const key1 = `${fromId}-${toId}`;
  const key2 = `${toId}-${fromId}`;
  const dist = DHAKA_DISTANCE_MATRIX[key1] || DHAKA_DISTANCE_MATRIX[key2] || 12;

  // Approximate traffic time in Dhaka
  let timeStr = "";
  if (dist <= 5) timeStr = "20-35 mins";
  else if (dist <= 10) timeStr = "35-55 mins";
  else if (dist <= 18) timeStr = "50-80 mins (via Expressway/Main road)";
  else timeStr = "75-110 mins (Cross-Dhaka Transit)";

  return {
    distance: dist,
    time: timeStr,
    routeNote: dist > 12 ? "Recommended via Dhaka Elevated Expressway / Flyover" : "Standard Dhaka City Arterial Route"
  };
};

// Shifting Vehicle Types
export const VEHICLE_TYPES = [
  {
    id: "pickup_1ton",
    name: "Pickup Van (1 Ton / 7 ft)",
    tagline: "Ideal for Bachelors & 1-BHK Flat",
    capacity: "Up to 1,000 kg",
    size: "7 ft length x 4.5 ft width",
    baseFare: 1600,
    perKmRate: 65,
    recommendedFor: "1 Bed, Single Fridge, Washing Machine, 10-15 Boxes",
    icon: "🚚",
    popular: false
  },
  {
    id: "mini_truck_15ton",
    name: "Mini Truck / Bongo (1.5 Ton / 9 ft)",
    tagline: "Most Popular for 2-BHK Family Apartment",
    capacity: "Up to 1,500 kg",
    size: "9 ft length x 5.5 ft width",
    baseFare: 2500,
    perKmRate: 85,
    recommendedFor: "2 Beds, Sofa set, Dining table, Fridge, 20-30 Boxes",
    icon: "🚛",
    popular: true
  },
  {
    id: "covered_van_3ton",
    name: "Covered Van (2.5 - 3 Ton / 14 ft)",
    tagline: "All-Weather Safe for 3-BHK Household & Electronics",
    capacity: "Up to 3,000 kg",
    size: "14 ft length x 6.5 ft width (Waterproof Covered)",
    baseFare: 4200,
    perKmRate: 110,
    recommendedFor: "3 BHK Full Household, Large Wardrobes, ACs, Fragile Electronics",
    icon: "📦",
    popular: false
  },
  {
    id: "large_truck_5ton",
    name: "Heavy Duty Truck (5 Ton / 18 ft)",
    tagline: "Large 4+ BHK Duplex & Heavy Hardwood Furniture",
    capacity: "Up to 5,000 kg",
    size: "18 ft length x 7.5 ft width",
    baseFare: 6500,
    perKmRate: 140,
    recommendedFor: "4+ BHK, Office relocation, Multiple king beds & heavy items",
    icon: "🚚",
    popular: false
  },
  {
    id: "local_van",
    name: "Local Electric / Push Van",
    tagline: "Same Road / Neighborhood Short Distance",
    capacity: "Up to 500 kg",
    size: "Open local carrier",
    baseFare: 900,
    perKmRate: 45,
    recommendedFor: "Same sector move, few furniture pieces, boxes",
    icon: "🛺",
    popular: false
  }
];

// Household items & accessories checklist
export const HOME_ACCESSORIES_LIST = [
  { id: "sofa", label: "Sofa Set (3+2+1 or L-shape)", category: "Living Room", points: 3 },
  { id: "tv_unit", label: "Center Table & TV Cabinet", category: "Living Room", points: 1 },
  { id: "tv_screen", label: "Large LED/OLED Smart TV", category: "Living Room", points: 1 },
  { id: "master_bed", label: "King / Queen Size Bed + Mattress", category: "Bedroom", points: 3 },
  { id: "wardrobe", label: "Almirah / 4-Door Wardrobe", category: "Bedroom", points: 3 },
  { id: "dressing_table", label: "Dressing Table & Mirror", category: "Bedroom", points: 1 },
  { id: "kids_bed", label: "Single Bed / Bunk Bed", category: "Bedroom", points: 2 },
  { id: "dining_table", label: "Dining Table & 6 Chairs", category: "Dining", points: 2 },
  { id: "refrigerator", label: "Refrigerator / Deep Freezer", category: "Kitchen", points: 2 },
  { id: "washing_machine", label: "Washing Machine & Dryer", category: "Appliances", points: 1 },
  { id: "microwave_oven", label: "Microwave Oven & Kitchen Racks", category: "Kitchen", points: 1 },
  { id: "kitchen_boxes", label: "Kitchen Cookware & Crockery Boxes (5+)", category: "Kitchen", points: 2 },
  { id: "air_conditioners", label: "Split AC Units (Indoor + Outdoor)", category: "Appliances", points: 2 },
  { id: "study_desk", label: "Workstation / Office Desk & Chair", category: "Bedroom", points: 1 },
  { id: "cloth_boxes", label: "Luggage & Clothes Cartons (8+)", category: "General", points: 2 },
  { id: "plants_decor", label: "Balcony Plants & Delicate Decors", category: "General", points: 1 }
];

// Technician & Setup Services for New Apartments
export const TECHNICIAN_SERVICES = [
  {
    id: "ac_install",
    title: "Split AC Master Installation",
    category: "Air Conditioning",
    icon: "❄️",
    price: 1500,
    unit: "per AC unit",
    description: "Indoor & outdoor unit mounting, copper piping, wall bracket fixing, vacuuming & performance test."
  },
  {
    id: "ac_uninstall",
    title: "Old Home AC Dismantling & Shifting",
    category: "Air Conditioning",
    icon: "🛠️",
    price: 900,
    unit: "per AC unit",
    description: "Safe gas lock, professional detachment from old wall, piping preservation ready for shifting."
  },
  {
    id: "ac_gas_service",
    title: "AC Gas Top-Up & Jet Cleaning",
    category: "Air Conditioning",
    icon: "💨",
    price: 1800,
    unit: "per AC unit",
    description: "R410A / R32 gas refill, high pressure jet wash of condenser and cooling coils."
  },
  {
    id: "electrician_ceiling_fans",
    title: "Ceiling Fan & Chandelier Hanging",
    category: "Electrical",
    icon: "⚡",
    price: 350,
    unit: "per fan / light",
    description: "Hook check, safety regulator connection, balance test and blade alignment."
  },
  {
    id: "electrician_tv_mount",
    title: "Smart TV Wall Mount Installation",
    category: "Electrical",
    icon: "📺",
    price: 550,
    unit: "per TV",
    description: "Heavy duty wall drilling, bracket balance leveling, cable concealment and HDMI hookup."
  },
  {
    id: "electrician_ips",
    title: "IPS / Inverter & Battery Wiring",
    category: "Electrical",
    icon: "🔋",
    price: 1200,
    unit: "per system",
    description: "Load phase separation, battery water check, grounding and emergency auto-cut test."
  },
  {
    id: "electrician_geyser",
    title: "Bathroom Water Heater (Geyser) Setup",
    category: "Electrical",
    icon: "🚿",
    price: 900,
    unit: "per geyser",
    description: "Safety valve fitting, heavy amp switch connection, earthing check and leak verification."
  },
  {
    id: "plumber_water_purifier",
    title: "Kitchen Water Filter / RO Machine Fitting",
    category: "Plumbing",
    icon: "💧",
    price: 650,
    unit: "per filter",
    description: "Inlet tap divergence, waste line setup, filter cartridge flush and TDS measurement."
  },
  {
    id: "carpenter_bed_assembly",
    title: "Furniture Assembly & Bed Fitting",
    category: "Carpentry",
    icon: "🪚",
    price: 800,
    unit: "per large furniture",
    description: "Hydraulic king bed assemble, wooden wardrobe alignment, curtain rod wall anchors."
  },
  {
    id: "deep_cleaning",
    title: "Pre-Move Deep House Sanitization",
    category: "Cleaning",
    icon: "🧹",
    price: 3200,
    unit: "full apartment",
    description: "Deep chemical scrub of tiles, bathrooms, kitchen chimneys, glass windows before furniture arrives."
  }
];

// Verified Nearby Technicians across Dhaka
export const DHAKA_TECHNICIANS = [
  {
    id: "tech-1",
    name: "Engr. Rafiqul Islam",
    trade: "Senior AC & HVAC Specialist",
    speciality: "Inverter ACs (Gree, General, Daikin, Walton)",
    area: "Gulshan & Banani",
    areaId: "gulshan",
    experience: "9 Years Experience",
    rating: 4.95,
    jobsCompleted: 340,
    phone: "+880 1711-234567",
    verified: true,
    availableToday: true,
    startingRate: 900,
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "tech-2",
    name: "Kabir Hossain",
    trade: "Master Electrician & TV Installer",
    speciality: "TV Wall Mounting, IPS Setup, Concealed Wiring",
    area: "Dhanmondi & Lalmatia",
    areaId: "dhanmondi",
    experience: "7 Years Experience",
    rating: 4.9,
    jobsCompleted: 280,
    phone: "+880 1819-876543",
    verified: true,
    availableToday: true,
    startingRate: 350,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "tech-3",
    name: "Md. Al-Amin Miah",
    trade: "Furniture Assembler & Master Carpenter",
    speciality: "Otobi, Hatil & Regal Furniture Assemble & Repair",
    area: "Mirpur & Mohammadpur",
    areaId: "mirpur",
    experience: "11 Years Experience",
    rating: 4.88,
    jobsCompleted: 410,
    phone: "+880 1912-345678",
    verified: true,
    availableToday: true,
    startingRate: 600,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "tech-4",
    name: "Tariqul Bashar",
    trade: "Certified AC & Refrigerator Tech",
    speciality: "Split AC Installation, Gas Refill, PCB Repairs",
    area: "Uttara (Sectors 1-14)",
    areaId: "uttara",
    experience: "6 Years Experience",
    rating: 4.92,
    jobsCompleted: 195,
    phone: "+880 1622-445566",
    verified: true,
    availableToday: true,
    startingRate: 850,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "tech-5",
    name: "Shorab Hossain",
    trade: "Sanitary & RO Water Plumber",
    speciality: "Geyser, RO Water Filter, Bathroom Modern Fixtures",
    area: "Bashundhara R/A & Baridhara",
    areaId: "bashundhara",
    experience: "8 Years Experience",
    rating: 4.85,
    jobsCompleted: 220,
    phone: "+880 1733-998877",
    verified: true,
    availableToday: true,
    startingRate: 500,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "tech-6",
    name: "Zahangir Alam",
    trade: "House Sanitization & Deep Cleaning Team Lead",
    speciality: "Post-Move Kitchen, Bathroom & Floor Polishing",
    area: "All Dhaka City Zones",
    areaId: "gulshan",
    experience: "5 Years Experience",
    rating: 4.94,
    jobsCompleted: 310,
    phone: "+880 1552-667788",
    verified: true,
    availableToday: true,
    startingRate: 2500,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
  }
];

// Rich Dhaka City Apartment Listings
export const DHAKA_APARTMENTS = [
  {
    _id: "dh-apt-1",
    apartmentNo: "7-A",
    title: "Luxury Lakeview 3-BHK Apartment in Gulshan 2",
    blockName: "Road 71, Gulshan 2",
    floorNo: 7,
    rent: 68000,
    areaName: "Gulshan",
    areaId: "gulshan",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 2150,
    gasType: "Titas Line Gas",
    amenities: ["Generator Backup", "Dual Lifts", "24/7 Security & CCTV", "Covered Car Parking", "Lakeview Balcony", "Intercom"],
    apartmentImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    description: "Magnificent open layout with expansive lake views, imported fittings, servant room with attached bath, and round-the-clock standby generator. Walking distance from diplomatic zone.",
    availableDate: "Immediate Move-in",
    contactPhone: "+880 1711-889900"
  },
  {
    _id: "dh-apt-2",
    apartmentNo: "4-B",
    title: "Modern Executive 3-BHK Flat in Banani",
    blockName: "Block C, Road 11, Banani",
    floorNo: 4,
    rent: 55000,
    areaName: "Banani",
    areaId: "banani",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 1850,
    gasType: "Titas Line Gas",
    amenities: ["High-speed Lift", "Full Generator Backup", "CCTV Surveillance", "Dedicated Parking", "South Facing"],
    apartmentImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    description: "Elegantly finished 3-bedroom residence right next to Banani 11 dining and shopping hub. South-facing with ample daylight and cross ventilation.",
    availableDate: "Available 1st of Next Month",
    contactPhone: "+880 1819-223344"
  },
  {
    _id: "dh-apt-3",
    apartmentNo: "5-C",
    title: "Peaceful Family 3-BHK Residence in Dhanmondi",
    blockName: "Road 8/A, Dhanmondi",
    floorNo: 5,
    rent: 42000,
    areaName: "Dhanmondi",
    areaId: "dhanmondi",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 1650,
    gasType: "Titas Line Gas",
    amenities: ["Lift", "Generator", "24/7 Guard", "Car Parking", "Wide Balconies", "Near Dhanmondi Lake"],
    apartmentImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Quiet green neighborhood 2 minutes away from Dhanmondi Lake walkway. Close to top schools, clinics, and supermarkets. Ideal family atmosphere.",
    availableDate: "Immediate Move-in",
    contactPhone: "+880 1912-887766"
  },
  {
    _id: "dh-apt-4",
    apartmentNo: "3-A",
    title: "Spacious Premium 4-BHK in Uttara Sector 7",
    blockName: "Sector 7, Road 18, Uttara",
    floorNo: 3,
    rent: 48000,
    areaName: "Uttara",
    areaId: "uttara",
    bedrooms: 4,
    bathrooms: 4,
    sizeSqft: 2300,
    gasType: "LPG Cylinders",
    amenities: ["Double Elevator", "Full Power Backup", "2 Parking Slots", "Community Hall", "Rooftop Garden"],
    apartmentImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    description: "Large 4-bedroom family home located near Uttara Metro Station and Rabindra Sarani. Features rooftop landscaped garden and children play area.",
    availableDate: "Available Now",
    contactPhone: "+880 1733-112233"
  },
  {
    _id: "dh-apt-5",
    apartmentNo: "6-D",
    title: "Contemporary 2-BHK Apartment in Bashundhara R/A",
    blockName: "Block D, Road 4, Bashundhara",
    floorNo: 6,
    rent: 28000,
    areaName: "Bashundhara R/A",
    areaId: "bashundhara",
    bedrooms: 2,
    bathrooms: 2,
    sizeSqft: 1250,
    gasType: "LPG Gas System",
    amenities: ["Modern Lift", "Standby Generator", "Security Guard", "Open Balcony", "Near North South Univ"],
    apartmentImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    description: "Cozy, sunlit 2-bedroom home perfect for young couples, small families or university faculty. Gated community with pristine security and broad avenues.",
    availableDate: "Ready for move-in",
    contactPhone: "+880 1622-990011"
  },
  {
    _id: "dh-apt-6",
    apartmentNo: "8-B",
    title: "Prime 3-BHK Apartment in Mirpur DOHS",
    blockName: "Avenue 3, Mirpur DOHS",
    floorNo: 8,
    rent: 36000,
    areaName: "Mirpur DOHS",
    areaId: "mirpur",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 1700,
    gasType: "Titas Line Gas",
    amenities: ["Military Grade Security", "Lifts", "Power Backup", "Dedicated Parking", "Jogging Track", "Lake View"],
    apartmentImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    description: "Located inside the prestigious and safe Mirpur DOHS cantonment boundary. Zero disturbance, wide roads, and unmatched peace of mind for your family.",
    availableDate: "Immediate",
    contactPhone: "+880 1711-554433"
  },
  {
    _id: "dh-apt-7",
    apartmentNo: "2-A",
    title: "Affordable Cozy 2-BHK in Mohammadpur",
    blockName: "Kaderabad Housing, Mohammadpur",
    floorNo: 2,
    rent: 24000,
    areaName: "Mohammadpur",
    areaId: "mohammadpur",
    bedrooms: 2,
    bathrooms: 2,
    sizeSqft: 1100,
    gasType: "Titas Line Gas",
    amenities: ["Lift", "CCTV", "Night Guard", "Separate Utility Meters", "South Open"],
    apartmentImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    description: "Very budget-friendly 2-BHK flat close to Ring Road & Asad Gate. Quick connectivity to Dhanmondi, Farmgate, and Shyamoli.",
    availableDate: "Available Now",
    contactPhone: "+880 1819-445566"
  },
  {
    _id: "dh-apt-8",
    apartmentNo: "10-A",
    title: "Super Penthouse 4-BHK in Mohakhali DOHS",
    blockName: "Road 24, Mohakhali DOHS",
    floorNo: 10,
    rent: 85000,
    areaName: "Mohakhali DOHS",
    areaId: "mohakhali",
    bedrooms: 4,
    bathrooms: 5,
    sizeSqft: 3100,
    gasType: "Titas Line Gas",
    amenities: ["Private Terrace", "2 Dedicated Lifts", "2 Car Parks", "Full AC Equipped", "24/7 Power", "Gym Access"],
    apartmentImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
    description: "Exclusive top-floor penthouse with private garden terrace overlooking central Dhaka skyline. High-end wood flooring, imported sanitary, and master suite.",
    availableDate: "Immediate Move-in",
    contactPhone: "+880 1711-778899"
  },
  {
    _id: "dh-apt-9",
    apartmentNo: "3-B",
    title: "Sunny 3-BHK Flat in Baridhara J-Block",
    blockName: "Block J, Baridhara",
    floorNo: 3,
    rent: 58000,
    areaName: "Baridhara",
    areaId: "baridhara",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqft: 1950,
    gasType: "Titas Line Gas",
    amenities: ["Elevator", "Standby Generator", "Intercom", "Secure Gate", "Car Parking", "Near American Club"],
    apartmentImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    description: "Peaceful location next to the diplomatic zone. Very spacious master bedroom with walk-in closet, maid room, and large kitchen.",
    availableDate: "Available Next Month",
    contactPhone: "+880 1912-334455"
  }
];
