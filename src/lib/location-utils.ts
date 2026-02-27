export type Coordinates = {
  lat: number;
  lng: number;
};

export type LocationWithCoordinates = {
  id: number;
  lat: number;
  lng: number;
};

export const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const radius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return radius * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const getTravelTimeMinutes = (distanceKm: number): number => {
  const avgSpeedKmh = 40;
  const timeHours = distanceKm / avgSpeedKmh;
  return Math.round(timeHours * 60);
};

export const findNearestLocation = <T extends LocationWithCoordinates>(
  userCoords: Coordinates,
  locations: T[]
): T | null => {
  if (locations.length === 0) return null;

  return locations.reduce((previous, current) => {
    const previousDistance = getDistanceKm(
      userCoords.lat,
      userCoords.lng,
      previous.lat,
      previous.lng
    );
    const currentDistance = getDistanceKm(
      userCoords.lat,
      userCoords.lng,
      current.lat,
      current.lng
    );

    return currentDistance < previousDistance ? current : previous;
  });
};

export const requestUserLocation = (
  options: PositionOptions = { timeout: 10000 }
): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => reject(error),
      options
    );
  });
};

export const isIOSDevice = (): boolean =>
  typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const getMapsLink = (address: string): string => {
  const encoded = encodeURIComponent(address);
  return isIOSDevice()
    ? `https://maps.apple.com/?q=${encoded}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
};
