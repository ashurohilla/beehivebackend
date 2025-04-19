module.exports = function haversine(loc1, loc2) {
  const toRad = (v) => (v * Math.PI) / 180; // Convert degrees to radians
  const R = 6371; // Radius of Earth in kilometers

  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);
  const lat1 = toRad(loc1.latitude);
  const lat2 = toRad(loc2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};