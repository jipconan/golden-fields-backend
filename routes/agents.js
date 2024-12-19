const express = require('express');
const router = express.Router();
const agentsCtrl = require('../controllers/agents');

// GET all agents
router.get('/', agentsCtrl.getAllAgents);

// GET a single agent by ID
router.get('/agent/:id', agentsCtrl.getAgentById);

// GET all agents based on CategoryName
router.get('/category/:category', agentsCtrl.getAgentsByCategory);

// POST create a new agent
router.post('/create', agentsCtrl.createAgent);

// PUT update an existing agent by ID
router.put('/update/:id', agentsCtrl.updateAgent);

// DELETE a agent by ID
router.delete('/delete/:id', agentsCtrl.deleteAgent);

module.exports = router;
