const agentsModel = require('../models/agents');
const { toLowerCase } = require('../utils/formatText');

module.exports = {
  getAllAgents,
  getAgentById,
  getAgentsByCategory,
  createAgent,
  updateAgent,
  deleteAgent,
};

async function getAllAgents(req, res) {
  try {
    const data = await agentsModel.getAllAgentsData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAgentById(req, res) {
  try {
    const data = await agentsModel.getAgentByIdData(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Agent id not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAgentsByCategory(req, res) {
  try {
    const params = ['name', 'experience', 'languages'];
    const lowercaseParams = params.reduce((acc, param) => {
      if (req.params[param]) {
        acc[param] = toLowerCase(req.params[param]);
      }
      return acc;
    }, {});

    const { name: lowercaseName, experience: lowercaseExperience, languages: lowercaseLanguages } = lowercaseParams;

    // Fetch data based on available params
    const data = await agentsModel.getAgentsByCategoryData(lowercaseName, lowercaseExperience, lowercaseLanguages);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No agents found for this category' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve agents by category' });
  }
}

async function createAgent(req, res) {
  try {
    const newData = await agentsModel.createAgentData(req.body);
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateAgent(req, res) {
  try {
    const updatedData = await agentsModel.updateAgentData(req.params.id, req.body);
    if (!updatedData) {
      return res.status(404).json({ message: 'Agent id not found' });
    }
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteAgent(req, res) {
  try {
    const result = await agentsModel.deleteAgentData(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Agent id not found' });
    }
    res.status(204).json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
