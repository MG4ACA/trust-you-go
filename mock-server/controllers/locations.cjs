// mock-server/controllers/locations.cjs
const populateLocation = require('./populateLocation.cjs');

module.exports = (server, db) => {
  // Initialize database collections
  if (!db.locations) {
    db.locations = [];
  }
  if (!db.locationImages) {
    db.locationImages = [];
  }

  // GET /locations - Get all locations with images
  server.get('/locations', (req, res) => {
    const locations = db.get('locations').value();
    if (locations) {
      const populatedLocations = locations.map(populateLocation);
      res.json({
        success: true,
        data: populatedLocations,
      });
    } else {
      res.status(404).json({ error: 'Locations not found' });
    }
  });

  // GET /locations/:id - Get location by ID with images
  server.get('/locations/:id', (req, res) => {
    const location = db
      .get('locations')
      .find((l) => l.id === req.params.id)
      .value();

    if (location) {
      const populatedLocation = populateLocation(location);
      res.json({
        success: true,
        data: populatedLocation,
      });
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  });

  // POST /locations - Create new location
  server.post('/locations', (req, res) => {
    const { images, ...locationData } = req.body;
    const locationId = Date.now().toString();

    const newLocation = {
      id: locationId,
      ...locationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add location to locations collection
    db.get('locations').push(newLocation).write();

    // Add location images if provided
    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        const locationImage = {
          id: Date.now().toString() + index,
          locationId: locationId,
          imageUrl: image.imageUrl,
          thumbnailUrl: image.thumbnailUrl || null,
          displayOrder: image.displayOrder || index,
          uploadedAt: new Date().toISOString(),
        };
        db.get('locationImages').push(locationImage).write();
      });
    }

    const populatedLocation = populateLocation(newLocation);
    res.json({
      success: true,
      data: populatedLocation,
    });
  });

  // PUT /locations/:id - Update location
  server.put('/locations/:id', (req, res) => {
    const locationId = req.params.id;
    const locationExists = db.get('locations').find({ id: locationId }).value();

    if (!locationExists) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const { images, ...locationData } = req.body;

    const updatedData = {
      ...locationData,
      updatedAt: new Date().toISOString(),
    };

    // Update location data
    db.get('locations').find({ id: locationId }).assign(updatedData).write();

    // Update location images if provided
    if (images && Array.isArray(images)) {
      // Remove existing location images
      db.get('locationImages').remove({ locationId: locationId }).write();

      // Add new location images
      images.forEach((image, index) => {
        const locationImage = {
          id: Date.now().toString() + index,
          locationId: locationId,
          imageUrl: image.imageUrl,
          thumbnailUrl: image.thumbnailUrl || null,
          displayOrder: image.displayOrder || index,
          uploadedAt: new Date().toISOString(),
        };
        db.get('locationImages').push(locationImage).write();
      });
    }

    const updatedLocation = db.get('locations').find({ id: locationId }).value();
    const populatedLocation = populateLocation(updatedLocation);

    res.json({
      success: true,
      data: populatedLocation,
    });
  });

  // DELETE /locations/:id - Delete location
  server.delete('/locations/:id', (req, res) => {
    const locationId = req.params.id;
    const locationExists = db.get('locations').find({ id: locationId }).value();

    if (!locationExists) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Remove location from locations collection
    db.get('locations').remove({ id: locationId }).write();

    // Remove associated location images
    db.get('locationImages').remove({ locationId: locationId }).write();

    // Remove associated package locations
    db.get('packageLocations').remove({ locationId: locationId }).write();

    res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  });
};
