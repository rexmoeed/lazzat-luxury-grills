import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { MapPin, Clock, Phone, Navigation, Copy, Share2, Wifi, Car, ShoppingBag, LucideIcon } from "lucide-react";

/* =====================
   Location Data
===================== */
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
    amenities: ["parking", "wifi", "takeaway"],
  },
  {
    id: 2,
    name: "Lazzat Grill & Shakes",
    address: "Lazzat Grill and Shakes 143 Clarence St, Unit 10 Brampton ON L6W 1T2",
    lat: 43.6847,
    lng: -79.7599,
    phone: "+1 (234) 567-8200",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM",
      sunday: "11:00 AM - 9:00 PM",
    },
    amenities: ["parking", "wifi", "takeaway"],
  },
];

/* =====================
   Helpers
===================== */
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

const getTravelTime = (distanceKm: number) => {
  const avgSpeedKmh = 40; // Average city driving speed
  const timeHours = distanceKm / avgSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  return timeMinutes;
};

const isLocationOpen = (hours: typeof locations[0]['hours']) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const currentTime = now.getHours() * 60 + now.getMinutes();

  let hoursString = '';
  if (day === 0) {
    hoursString = hours.sunday;
  } else if (day === 5 || day === 6) {
    hoursString = hours.weekend;
  } else {
    hoursString = hours.weekday;
  }

  const match = hoursString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/);
  if (!match) return false;

  const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;
  
  let openTime = parseInt(startHour) * 60 + parseInt(startMin);
  if (startPeriod === 'PM' && startHour !== '12') openTime += 12 * 60;
  if (startPeriod === 'AM' && startHour === '12') openTime = parseInt(startMin);

  let closeTime = parseInt(endHour) * 60 + parseInt(endMin);
  if (endPeriod === 'PM' && endHour !== '12') closeTime += 12 * 60;
  if (endPeriod === 'AM' && endHour === '12') closeTime = parseInt(endMin);
  if (closeTime < openTime) closeTime += 24 * 60; // Next day

  return currentTime >= openTime && currentTime <= closeTime;
};

const amenityIcons: Record<string, { icon: LucideIcon; label: string }> = {
  parking: { icon: Car, label: "Parking Available" },
  wifi: { icon: Wifi, label: "Free WiFi" },
  takeaway: { icon: ShoppingBag, label: "Takeaway Only" },
};

/* =====================
   Component
===================== */
const Locations = () => {
  const [nearestId, setNearestId] = useState<number | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [openMaps, setOpenMaps] = useState<{ [key: number]: boolean }>({});
  const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error' | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('loading');
    setHasRequestedLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        const nearest = locations.reduce((prev, curr) => {
          const prevDist = getDistance(latitude, longitude, prev.lat, prev.lng);
          const currDist = getDistance(latitude, longitude, curr.lat, curr.lng);
          return currDist < prevDist ? curr : prev;
        });

        setNearestId(nearest.id);
        setLocationStatus('success');

        document
          .getElementById(`location-${nearest.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      () => {
        setLocationStatus('error');
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    // Don't auto-request on mount - wait for user action
  }, []);

  const retryLocation = () => {
    requestLocation();
  };

  const toggleMap = (id: number) => {
    setOpenMaps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDetails = (id: number) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyAddress = async (address: string, id: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLocation = async (location: typeof locations[0]) => {
    const shareData = {
      title: location.name,
      text: `Check out ${location.name} at ${location.address}`,
      url: getMapsLink(location.address),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${location.name}\n${location.address}\n${shareData.url}`);
        alert('Location details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Layout>
      {/* Hero */}
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

      {/* Locations */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-card">
        <div className="container-luxury px-4">
          {/* Location Permission Prompt */}
          {!hasRequestedLocation && (
            <div className="mb-6 p-6 rounded-lg border border-primary/30 bg-background/95 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-serif text-foreground mb-2">
                Find Your Nearest Location
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enable location access to see which Lazzat branch is closest to you.
              </p>
              <button
                onClick={requestLocation}
                className="btn-gold px-6 py-2.5 text-sm font-semibold"
              >
                Enable Location
              </button>
            </div>
          )}

          {/* Status Banner */}
          {locationStatus === 'loading' && (
            <div className="mb-6 p-4 rounded-lg border border-primary/20 bg-background/50 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Finding your nearest location...</span>
              </div>
            </div>
          )}

          {locationStatus === 'error' && (
            <div className="mb-6 p-4 rounded-lg border border-primary/30 bg-background text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Please enable location access on your device to find the nearest branch, or view both locations below.
              </p>
              <button
                onClick={retryLocation}
                className="text-sm text-primary hover:underline font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {locations.map((location) => {
            const isNearest = nearestId === location.id;
            const isOpen = openMaps[location.id];

            return (
              <div
                key={location.id}
                id={`location-${location.id}`}
                className={`bg-background border rounded-lg p-3 md:p-5 transition-all duration-700 ${
                  isNearest 
                    ? "border-primary shadow-[0_0_25px_rgba(218,170,67,0.4)] animate-pulse-glow scale-[1.02]" 
                    : "border-primary/20"
                }`}
                style={isNearest ? {
                  animation: 'pulse-glow 2s ease-in-out infinite'
                } : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isNearest && (
                      <span className="text-xs font-semibold text-primary uppercase">
                        Nearest to you
                      </span>
                    )}
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isLocationOpen(location.hours)
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {isLocationOpen(location.hours) ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </div>

                {userCoords && (
                  <div className="text-xs text-muted-foreground mb-2">
                    {getDistance(userCoords.lat, userCoords.lng, location.lat, location.lng).toFixed(1)} km away • ~{getTravelTime(getDistance(userCoords.lat, userCoords.lng, location.lat, location.lng))} min drive
                  </div>
                )}

                {/* Title */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-foreground">
                    {location.name}
                  </h3>

                  <button
                    onClick={() => toggleDetails(location.id)}
                    className="text-xs text-primary md:hidden"
                  >
                    {openDetails[location.id] ? "Hide details" : "View details"}
                  </button>
                </div>

                {/* Details */}
                <div
                  className={`
                    space-y-3 text-muted-foreground text-sm
                    ${openDetails[location.id] ? "block" : "hidden"}
                    md:block
                  `}
                >
                  <a
                    href={getMapsLink(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-start"
                  >
                    <MapPin className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)] mt-0.5" />
                    <p className="text-muted-foreground">
                      {location.address}
                    </p>
                  </a>

                  <div className="flex gap-2 items-center">
                    <Phone className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
                    <a href={`tel:${location.phone}`} className="text-muted-foreground">
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.7)] mt-0.5" />
                    <div className="space-y-1 text-muted-foreground">
                      <div>Mon–Thu: {location.hours.weekday}</div>
                      <div>Fri–Sat: {location.hours.weekend}</div>
                      <div>Sunday: {location.hours.sunday}</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {location.amenities && location.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-primary/10">
                    {location.amenities.map((amenity) => {
                      const AmenityIcon = amenityIcons[amenity]?.icon;
                      const label = amenityIcons[amenity]?.label;
                      if (!AmenityIcon) return null;
                      return (
                        <div key={amenity} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <AmenityIcon className="w-4 h-4 text-primary" />
                          <span>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => copyAddress(location.address, location.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-primary/30 bg-background/50 hover:border-primary hover:bg-primary/5 transition text-xs font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedId === location.id ? "Copied!" : "Copy Address"}
                  </button>
                  <button
                    onClick={() => shareLocation(location)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-primary/30 bg-background/50 hover:border-primary hover:bg-primary/5 transition text-xs font-medium"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>

                {/* Icons row */}
                <div className="flex items-center justify-center gap-6 mt-4 mb-3">
                  <a
                    href={getMapsLink(location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-primary hover:scale-110 transition"
                  >
                    <Navigation className="w-6 h-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                    <span className="text-[11px] mt-1">Get Directions</span>
                  </a>

                  <button
                    onClick={() => toggleMap(location.id)}
                    className="flex flex-col items-center text-primary hover:scale-110 transition md:hidden"
                  >
                    <MapPin className="w-6 h-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                    <span className="text-[11px] mt-1">
                      {isOpen ? "Hide" : "Map"}
                    </span>
                  </button>
                </div>

                {/* Map */}
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
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
