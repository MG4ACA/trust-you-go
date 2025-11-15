// mock-server/controllers/admins.cjs
module.exports = (server, db) => {
  // Initialize database collections
  if (!db.admins) {
    db.admins = [];
  }

  // GET /admins - Get all admins or filter by query params (e.g., email)
  server.get('/admins', (req, res) => {
    let admins = db.get('admins').value();

    if (!admins) {
      return res.status(404).json({ error: 'Admins not found' });
    }

    // Filter by query parameters
    const { email, username, id } = req.query;

    if (email) {
      admins = admins.filter((a) => a.email === email);
    }

    if (username) {
      admins = admins.filter((a) => a.username === username);
    }

    if (id) {
      admins = admins.filter((a) => a.admin_id === id);
    }

    res.json({
      success: true,
      data: admins,
    });
  });

  // GET /admins/:id - Get admin by ID
  server.get('/admins/:id', (req, res) => {
    const admin = db
      .get('admins')
      .find((a) => a.admin_id === req.params.id)
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
      admin_id: adminId,
      ...adminData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
    const adminExists = db.get('admins').find({ admin_id: adminId }).value();

    if (!adminExists) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const adminData = req.body;

    const updatedData = {
      ...adminData,
      updated_at: new Date().toISOString(),
    };

    // Update admin data
    db.get('admins').find({ admin_id: adminId }).assign(updatedData).write();

    const updatedAdmin = db.get('admins').find({ admin_id: adminId }).value();

    res.json({
      success: true,
      data: updatedAdmin,
    });
  });

  // DELETE /admins/:id - Delete admin
  server.delete('/admins/:id', (req, res) => {
    const adminId = req.params.id;
    const adminExists = db.get('admins').find({ admin_id: adminId }).value();

    if (!adminExists) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Remove admin from admins collection
    db.get('admins').remove({ admin_id: adminId }).write();

    res.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  });
};
