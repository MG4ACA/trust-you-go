// mock-server/controllers/bookings.cjs
const populateBooking = (booking, db) => {
  // Populate package details
  if (booking.packageId) {
    const packageData = db
      .get('packages')
      .find((p) => p.id === booking.packageId)
      .value();
    if (packageData) {
      booking.package = packageData;
    }
  }

  // Populate agent details
  if (booking.agentId) {
    const agentData = db
      .get('agents')
      .find((a) => a.id === booking.agentId)
      .value();
    if (agentData) {
      booking.agent = agentData;
    }
  }

  // Populate traveler details (if travelers entity exists)
  if (booking.travelerId && db.traveler) {
    const travelerData = db
      .get('traveler')
      .find((t) => t.id === booking.travelerId)
      .value();
    if (travelerData) {
      booking.traveler = travelerData;
    }
  }

  return booking;
};

module.exports = (server, db) => {
  // Initialize database collections
  if (!db.bookings) {
    db.bookings = [];
  }

  // GET /bookings - Get all bookings
  server.get('/bookings', (req, res) => {
    const bookings = db.get('bookings').value();
    if (bookings) {
      // For list view, return basic booking info without full relationships
      res.json({
        success: true,
        data: bookings,
      });
    } else {
      res.status(404).json({ error: 'Bookings not found' });
    }
  });

  // GET /bookings/:id - Get booking by ID with populated relationships
  server.get('/bookings/:id', (req, res) => {
    const booking = db
      .get('bookings')
      .find((b) => b.id === req.params.id)
      .value();

    if (booking) {
      // Populate relationships for detailed view
      const populatedBooking = populateBooking({ ...booking }, db);
      res.json({
        success: true,
        data: populatedBooking,
      });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  });

  // GET /bookings/package/:packageId - Get bookings by package ID
  server.get('/bookings/package/:packageId', (req, res) => {
    const bookings = db
      .get('bookings')
      .filter((b) => b.packageId === req.params.packageId)
      .value();

    if (bookings) {
      res.json({
        success: true,
        data: bookings,
      });
    } else {
      res.status(404).json({ error: 'No bookings found for this package' });
    }
  });

  // GET /bookings/agent/:agentId - Get bookings by agent ID
  server.get('/bookings/agent/:agentId', (req, res) => {
    const bookings = db
      .get('bookings')
      .filter((b) => b.agentId === req.params.agentId)
      .value();

    if (bookings) {
      res.json({
        success: true,
        data: bookings,
      });
    } else {
      res.status(404).json({ error: 'No bookings found for this agent' });
    }
  });

  // POST /bookings - Create new booking
  server.post('/bookings', (req, res) => {
    const bookingData = req.body;
    const bookingId = Date.now().toString();

    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: bookingData.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add booking to bookings collection
    db.get('bookings').push(newBooking).write();

    // Populate relationships for response
    const populatedBooking = populateBooking({ ...newBooking }, db);

    res.json({
      success: true,
      data: populatedBooking,
    });
  });

  // PUT /bookings/:id - Update booking
  server.put('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const bookingExists = db.get('bookings').find({ id: bookingId }).value();

    if (!bookingExists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const bookingData = req.body;

    const updatedData = {
      ...bookingData,
      updatedAt: new Date().toISOString(),
    };

    // Update booking data
    db.get('bookings').find({ id: bookingId }).assign(updatedData).write();

    const updatedBooking = db.get('bookings').find({ id: bookingId }).value();

    // Populate relationships for response
    const populatedBooking = populateBooking({ ...updatedBooking }, db);

    res.json({
      success: true,
      data: populatedBooking,
    });
  });

  // DELETE /bookings/:id - Delete booking
  server.delete('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const bookingExists = db.get('bookings').find({ id: bookingId }).value();

    if (!bookingExists) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Remove booking from bookings collection
    db.get('bookings').remove({ id: bookingId }).write();

    res.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  });
};
