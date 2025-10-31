// mock-server/router/router.cjs
module.exports = (server, db) => {
  // Initialize all routes with proper DB instance
  require('../controllers/packages.cjs')(server, db);
  require('../controllers/locations.cjs')(server, db);
  require('../controllers/admins.cjs')(server, db);
  require('../controllers/agents.cjs')(server, db);
  require('../controllers/bookings.cjs')(server, db);
};
