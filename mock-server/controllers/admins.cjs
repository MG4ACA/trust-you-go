// mock-server/controllers/admins.cjs
module.exports = (server, db) => {
  // Initialize database collections
  if (!db.admins) {
    db.admins = [];
  }

  // GET /admins - Get all admins
  server.get('/admins', (req, res) => {
    const admins = db.get('admins').value();
    if (admins) {
      res.json({
        success: true,
        data: admins,
      });
    } else {
      res.status(404).json({ error: 'Admins not found' });
    }
  });

  // GET /admins/:id - Get admin by ID
  server.get('/admins/:id', (req, res) => {
    const admin = db
      .get('admins')
      .find((a) => a.id === req.params.id)
      .value();

    if (admin) {
      res.json({
        success: true,
        data: admin,
      });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  });

  // POST /admins - Create new admin
  server.post('/admins', (req, res) => {
    const adminData = req.body;
    const adminId = Date.now().toString();

    const newAdmin = {
      id: adminId,
      ...adminData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add admin to admins collection
    db.get('admins').push(newAdmin).write();

    res.json({
      success: true,
      data: newAdmin,
    });
  });

  // PUT /admins/:id - Update admin
  server.put('/admins/:id', (req, res) => {
    const adminId = req.params.id;
    const adminExists = db.get('admins').find({ id: adminId }).value();

    if (!adminExists) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const adminData = req.body;

    const updatedData = {
      ...adminData,
      updatedAt: new Date().toISOString(),
    };

    // Update admin data
    db.get('admins').find({ id: adminId }).assign(updatedData).write();

    const updatedAdmin = db.get('admins').find({ id: adminId }).value();

    res.json({
      success: true,
      data: updatedAdmin,
    });
  });

  // DELETE /admins/:id - Delete admin
  server.delete('/admins/:id', (req, res) => {
    const adminId = req.params.id;
    const adminExists = db.get('admins').find({ id: adminId }).value();

    if (!adminExists) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Remove admin from admins collection
    db.get('admins').remove({ id: adminId }).write();

    res.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  });
};
