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
      .find((l) => l.location_id === req.params.id)
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
      location_id: locationId,
      ...locationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add location to locations collection
    db.get('locations').push(newLocation).write();

    // Add location images if provided
    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        const locationImage = {
          image_id: Date.now().toString() + index,
          location_id: locationId,
          image_url: image.imageUrl,
          thumbnail_url: image.thumbnailUrl || null,
          display_order: image.displayOrder || index,
          uploaded_at: new Date().toISOString(),
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
    const locationExists = db.get('locations').find({ location_id: locationId }).value();

    if (!locationExists) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const { images, ...locationData } = req.body;

    const updatedData = {
      ...locationData,
      updated_at: new Date().toISOString(),
    };

    // Update location data
    db.get('locations').find({ location_id: locationId }).assign(updatedData).write();

    // Update location images if provided
    if (images && Array.isArray(images)) {
      // Remove existing location images
      db.get('locationImages').remove({ location_id: locationId }).write();

      // Add new location images
      images.forEach((image, index) => {
        const locationImage = {
          image_id: Date.now().toString() + index,
          location_id: locationId,
          image_url: image.imageUrl,
          thumbnail_url: image.thumbnailUrl || null,
          display_order: image.displayOrder || index,
          uploaded_at: new Date().toISOString(),
        };
        db.get('locationImages').push(locationImage).write();
      });
    }

    const updatedLocation = db.get('locations').find({ location_id: locationId }).value();
    const populatedLocation = populateLocation(updatedLocation);

    res.json({
      success: true,
      data: populatedLocation,
    });
  });

  // DELETE /locations/:id - Delete location
  server.delete('/locations/:id', (req, res) => {
    const locationId = req.params.id;
    const locationExists = db.get('locations').find({ location_id: locationId }).value();

    if (!locationExists) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Remove location from locations collection
    db.get('locations').remove({ location_id: locationId }).write();

    // Remove associated location images
    db.get('locationImages').remove({ location_id: locationId }).write();

    // Remove associated package locations
    db.get('packageLocations').remove({ location_id: locationId }).write();

    res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  });
};
