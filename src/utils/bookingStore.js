// Local storage management for all bookings (Apartment rentals, Mover trucks, Technicians)

const STORAGE_KEY = "rent_apartment_bookings_v1";

export const getBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSampleBookings();
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read bookings", e);
    return getDefaultSampleBookings();
  }
};

export const saveBooking = (newBooking) => {
  try {
    const current = getBookings();
    const bookingWithId = {
      id: `RA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      ...newBooking
    };
    const updated = [bookingWithId, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return bookingWithId;
  } catch (e) {
    console.error("Failed to save booking", e);
    return null;
  }
};

export const cancelBooking = (bookingId) => {
  try {
    const current = getBookings();
    const updated = current.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error("Failed to cancel booking", e);
    return false;
  }
};

function getDefaultSampleBookings() {
  return [
    {
      id: "RA-782194",
      type: "mover",
      title: "House Shifting: Dhanmondi to Banani",
      fromArea: "Dhanmondi",
      toArea: "Banani",
      distanceKm: 10.8,
      vehicle: "Mini Truck / Bongo (1.5 Ton / 9 ft)",
      helpersCount: 3,
      totalFare: 5218,
      scheduledDate: "Tomorrow, 9:30 AM",
      contactName: "Sajjad Hossain",
      contactPhone: "+880 1711-234567",
      status: "Confirmed",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      items: ["Sofa Set", "King Bed + Mattress", "Dining Table", "Refrigerator", "Washing Machine"]
    },
    {
      id: "RA-491028",
      type: "technician",
      title: "Split AC & TV Mount Setup in Banani",
      technicianName: "Engr. Rafiqul Islam",
      area: "Banani",
      services: ["Split AC Master Installation", "Smart TV Wall Mount Installation"],
      totalFare: 2050,
      scheduledDate: "Tomorrow, 3:00 PM",
      contactName: "Sajjad Hossain",
      contactPhone: "+880 1711-234567",
      status: "Confirmed",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];
}
