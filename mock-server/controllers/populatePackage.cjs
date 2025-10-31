// mock-server/controllers/populatePackage.cjs
const locationsData = require('../db/locations.cjs');
const packageLocationsData = require('../db/packageLocations.cjs');
const populateLocation = require('./populateLocation.cjs');

function populatePackage(packageData) {
  const packageId = packageData.id;

  // Ensure data arrays exist
  const locationsArray = Array.isArray(locationsData.locations) ? locationsData.locations : [];
  const packageLocationsArray = Array.isArray(packageLocationsData.packageLocations)
    ? packageLocationsData.packageLocations
    : [];

  // Get package locations for this package
  const packageLocs = packageLocationsArray.filter((pl) => pl.packageId === packageId);

  // Group locations by day
  const itinerary = {};
  packageLocs.forEach((pl) => {
    const location = locationsArray.find((loc) => loc.id === pl.locationId);
    if (location) {
      const populatedLocation = populateLocation(location);
      const dayKey = `day${pl.dayNumber}`;

      if (!itinerary[dayKey]) {
        itinerary[dayKey] = {
          dayNumber: pl.dayNumber,
          description: '',
          locations: [],
        };
      }

      itinerary[dayKey].locations.push({
        ...populatedLocation,
        visit_order: pl.visitOrder,
        notes: pl.notes || '',
      });
    }
  });

  // Convert to array and sort by day number
  const itineraryArray = Object.values(itinerary)
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map((day) => ({
      ...day,
      locations: day.locations.sort((a, b) => a.visit_order - b.visit_order),
    }));

  return {
    ...packageData,
    package_locations: packageLocs,
    itinerary: itineraryArray,
  };
}

module.exports = populatePackage;
