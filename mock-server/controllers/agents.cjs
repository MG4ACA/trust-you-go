// mock-server/controllers/agents.cjs
module.exports = (server, db) => {
  // Initialize database collections
  if (!db.agents) {
    db.agents = [];
  }

  // GET /agents - Get all agents
  server.get('/agents', (req, res) => {
    const agents = db.get('agents').value();
    if (agents) {
      res.json({
        success: true,
        data: agents,
      });
    } else {
      res.status(404).json({ error: 'Agents not found' });
    }
  });

  // GET /agents/:id - Get agent by ID
  server.get('/agents/:id', (req, res) => {
    const agent = db
      .get('agents')
      .find((a) => a.agent_id === req.params.id)
      .value();

    if (agent) {
      res.json({
        success: true,
        data: agent,
      });
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  });

  // POST /agents - Create new agent
  server.post('/agents', (req, res) => {
    const agentData = req.body;
    const agentId = Date.now().toString();

    const newAgent = {
      agent_id: agentId,
      ...agentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add agent to agents collection
    db.get('agents').push(newAgent).write();

    res.json({
      success: true,
      data: newAgent,
    });
  });

  // PUT /agents/:id - Update agent
  server.put('/agents/:id', (req, res) => {
    const agentId = req.params.id;
    const agentExists = db.get('agents').find({ agent_id: agentId }).value();

    if (!agentExists) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const agentData = req.body;

    const updatedData = {
      ...agentData,
      updated_at: new Date().toISOString(),
    };

    // Update agent data
    db.get('agents').find({ agent_id: agentId }).assign(updatedData).write();

    const updatedAgent = db.get('agents').find({ agent_id: agentId }).value();

    res.json({
      success: true,
      data: updatedAgent,
    });
  });

  // DELETE /agents/:id - Delete agent
  server.delete('/agents/:id', (req, res) => {
    const agentId = req.params.id;
    const agentExists = db.get('agents').find({ agent_id: agentId }).value();

    if (!agentExists) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Remove agent from agents collection
    db.get('agents').remove({ agent_id: agentId }).write();

    res.json({
      success: true,
      message: 'Agent deleted successfully',
    });
  });
};
