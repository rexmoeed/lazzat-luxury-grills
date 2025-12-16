import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

// =====================
// Location Data
// =====================
const locations = [
  {
    id: 1,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 43/49 - 11685 Mcvean Dr Brampton ON L6P 4N5",
    lat: 43.8065,
    lng: -79.6421,
    phone: "+1 (212) 555-0100",
    hours: {
      weekday: "11:00 AM - 11:00 PM",
      weekend: "11:00 AM - 12:00 AM",
      sunday: "12:00 PM - 10:00 PM",
    },
  },
  {
    id: 2,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 143 Clarence St, Unit 10 Brampton ON L6W 1T2",
    lat: 43.6847,
    lng: -79.7599,
    phone: "+1 (212) 555-0200",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM",
      sunday: "11:00 AM - 9:00 PM",
    },
  },
];

// =====================
// Helpers
// =====================
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

const getMapsLink = (address: string) => {
  const encoded = encodeURIComponent(address);
  return isIOS()
    ? `https://maps.apple.com/?q=${encoded}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// =====================
// Component
// =====================
const Locations = () => {
  const [nearestId, setNearestId] = useState<number | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [openMaps, setOpenMaps] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserCoords({ lat: latitude, lng: longitude });

      const nearest = locations.reduce((prev, curr) => {
        const prevDist = getDistance(latitude, longitude, prev.lat, prev.lng);
        const currDist = getDistance(latitude, longitude, curr.lat, curr.lng);
        return currDist < prevDist ? curr : prev;
      });

      setNearestId(nearest.id);

      document
        .getElementById(`location-${nearest.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const toggleMap = (id: number) => {
    setOpenMaps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background">
        <div className="container-luxury px-4 text-center">
          <div className="gold-divider w-16 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-primary">Locations</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We automatically highlight the nearest Lazzat branch for you.
          </p>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-luxury px-4 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {locations.map((location) => {
            const isNearest = nearestId === location.id;
            const isOpen = openMaps[location.id];

            return (
              <div
                key={location.id}
                id={`location-${location.id}`}
                className={`bg-background border rounded-lg p-3 md:p-5 transition-all ${
                  isNearest ? "border-primary shadow-gold scale-[1.015]" : "border-primary/20"
                }`}
              >
                {isNearest && (
                  <span className="text-xs font-semibold text-primary uppercase">
                    Nearest to you
                  </span>
                )}

                {userCoords && (
                  <div className="text-xs text-muted-foreground mb-1">
                    {getDistance(userCoords.lat, userCoords.lng, location.lat, location.lng).toFixed(1)} km away
                  </div>
                )}

                <h3 className="font-serif text-xl text-foreground mb-3">
                  {location.name}
                </h3>

                {/* Address – turns GOLD on hover */}
                <a
                  href={getMapsLink(location.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 mb-3 group"
                >
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-sm transition-colors duration-300 group-hover:text-primary cursor-pointer">
                    {location.address}
                  </p>
                </a>

                <div className="flex gap-2 mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href={`tel:${location.phone}`} className="text-sm hover:text-primary transition">
                    {location.phone}
                  </a>
                </div>

                <div className="flex gap-2 text-sm mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <div className="space-y-1">
                    <div>Mon–Thu: {location.hours.weekday}</div>
                    <div>Fri–Sat: {location.hours.weekend}</div>
                    <div>Sunday: {location.hours.sunday}</div>
                  </div>
                </div>

                <a
                  href={getMapsLink(location.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex justify-center gap-2 py-2 mb-3"
                >
                  <Navigation className="w-4 h-4" />
                  Open in {isIOS() ? "Apple Maps" : "Google Maps"}
                </a>

                <button
                  className="btn-gold w-full md:hidden mb-2"
                  onClick={() => toggleMap(location.id)}
                >
                  {isOpen ? "Hide Map" : "Show Map"}
                </button>

                {/* Map – name appears on pin */}
                <div
                  className={`overflow-hidden rounded-lg border transition-all ${
                    isOpen ? "h-48" : "h-0"
                  } md:h-56`}
                >
                  <iframe
  title={location.name}
  src={`https://maps.google.com/maps?q=${encodeURIComponent(
    `${location.name}, ${location.address}`
  )}&z=18&output=embed`}
  className="w-full h-full"
  loading="lazy"
/>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
