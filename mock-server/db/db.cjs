// mock-server/db/db.cjs
const { packages } = require('./packages.cjs');
const { locations } = require('./locations.cjs');
const { locationImages } = require('./locationImages.cjs');
const { packageLocations } = require('./packageLocations.cjs');
const { admins } = require('./admins.cjs');
const { agents } = require('./agents.cjs');
const { bookings } = require('./bookings.cjs');

module.exports = () => {
  return {
    packages: packages || [],
    locations: locations || [],
    locationImages: locationImages || [],
    packageLocations: packageLocations || [],
    admins: admins || [],
    agents: agents || [],
    bookings: bookings || [],
  };
};
