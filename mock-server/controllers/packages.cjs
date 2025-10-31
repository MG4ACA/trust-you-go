// mock-server/controllers/packages.cjs
const populatePackage = require('./populatePackage.cjs');

module.exports = (server, db) => {
  // Initialize database collections
  if (!db.packages) {
    db.packages = [];
  }
  if (!db.packageLocations) {
    db.packageLocations = [];
  }

  // GET /packages - Get all packages (basic info only)
  server.get('/packages', (req, res) => {
    const packages = db.get('packages').value();
    if (packages) {
      res.json({
        success: true,
        data: packages,
      });
    } else {
      res.status(404).json({ error: 'Packages not found' });
    }
  });

  // GET /packages/:id - Get package by ID with full details
  server.get('/packages/:id', (req, res) => {
    const packageData = db
      .get('packages')
      .find((p) => p.id === req.params.id)
      .value();

    if (packageData) {
      const populatedPackage = populatePackage(packageData);
      res.json({
        success: true,
        data: populatedPackage,
      });
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  });

  // POST /packages - Create new package
  server.post('/packages', (req, res) => {
    const { package_locations, itinerary, ...packageData } = req.body;
    const packageId = Date.now().toString();

    const newPackage = {
      id: packageId,
      ...packageData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add package to packages collection
    db.get('packages').push(newPackage).write();

    // Add package locations if provided
    if (package_locations && Array.isArray(package_locations)) {
      package_locations.forEach((pl, index) => {
        const packageLocation = {
          id: Date.now().toString() + index,
          packageId: packageId,
          locationId: pl.location_id,
          dayNumber: pl.day_number,
          visitOrder: pl.visit_order,
          notes: pl.notes || '',
          createdAt: new Date().toISOString(),
        };
        db.get('packageLocations').push(packageLocation).write();
      });
    }

    // If itinerary is provided, convert it to package_locations
    if (itinerary && Array.isArray(itinerary)) {
      let locationIndex = 0;
      itinerary.forEach((day) => {
        if (day.locations && Array.isArray(day.locations)) {
          day.locations.forEach((location) => {
            const packageLocation = {
              id: Date.now().toString() + locationIndex,
              packageId: packageId,
              locationId: location.id,
              dayNumber: day.dayNumber,
              visitOrder: location.visit_order || 0,
              notes: location.notes || '',
              createdAt: new Date().toISOString(),
            };
            db.get('packageLocations').push(packageLocation).write();
            locationIndex++;
          });
        }
      });
    }

    const populatedPackage = populatePackage(newPackage);
    res.json({
      success: true,
      data: populatedPackage,
    });
  });

  // PUT /packages/:id - Update package
  server.put('/packages/:id', (req, res) => {
    const packageId = req.params.id;
    const packageExists = db.get('packages').find({ id: packageId }).value();

    if (!packageExists) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const { package_locations, itinerary, ...packageData } = req.body;

    const updatedData = {
      ...packageData,
      updatedAt: new Date().toISOString(),
    };

    // Update package data
    db.get('packages').find({ id: packageId }).assign(updatedData).write();

    // Update package locations if provided
    if (package_locations && Array.isArray(package_locations)) {
      // Remove existing package locations
      db.get('packageLocations').remove({ packageId: packageId }).write();

      // Add new package locations
      package_locations.forEach((pl, index) => {
        const packageLocation = {
          id: Date.now().toString() + index,
          packageId: packageId,
          locationId: pl.location_id,
          dayNumber: pl.day_number,
          visitOrder: pl.visit_order,
          notes: pl.notes || '',
          createdAt: new Date().toISOString(),
        };
        db.get('packageLocations').push(packageLocation).write();
      });
    }

    // If itinerary is provided, convert it to package_locations
    if (itinerary && Array.isArray(itinerary)) {
      // Remove existing package locations
      db.get('packageLocations').remove({ packageId: packageId }).write();

      let locationIndex = 0;
      itinerary.forEach((day) => {
        if (day.locations && Array.isArray(day.locations)) {
          day.locations.forEach((location) => {
            const packageLocation = {
              id: Date.now().toString() + locationIndex,
              packageId: packageId,
              locationId: location.id,
              dayNumber: day.dayNumber,
              visitOrder: location.visit_order || 0,
              notes: location.notes || '',
              createdAt: new Date().toISOString(),
            };
            db.get('packageLocations').push(packageLocation).write();
            locationIndex++;
          });
        }
      });
    }

    const updatedPackage = db.get('packages').find({ id: packageId }).value();
    const populatedPackage = populatePackage(updatedPackage);

    res.json({
      success: true,
      data: populatedPackage,
    });
  });

  // DELETE /packages/:id - Delete package
  server.delete('/packages/:id', (req, res) => {
    const packageId = req.params.id;
    const packageExists = db.get('packages').find({ id: packageId }).value();

    if (!packageExists) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Remove package from packages collection
    db.get('packages').remove({ id: packageId }).write();

    // Remove associated package locations
    db.get('packageLocations').remove({ packageId: packageId }).write();

    res.json({
      success: true,
      message: 'Package deleted successfully',
    });
  });
};
