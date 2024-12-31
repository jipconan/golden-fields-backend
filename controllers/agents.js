const agentsModel = require('../models/agents');
const { toLowerCase } = require('../utils/formatText');

module.exports = {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
};

async function getAgents(req, res) {
  try {
    const { Names, Experience, Languages } = req.query;
  
    let data;

    if (Names || Experience || Languages) {
      // console.log(Names, Experience, Languages);
  
      // Fetch data based on available params
      data = await agentsModel.getAgentsByCategoryData(
        Names,
        Experience,
        Languages
      );
      
      if (!data || data.length === 0) {
        return res.status(404).json({ message: 'No agents found for this category' });
      }
    } else {
      // Fetch all agents if no filters are applied
      data = await agentsModel.getAllAgentsData();
    }
    // Ensure you're sending the data variable here
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching agents:", error);
    if (!res.headersSent) {  // prevent sending multiple responses
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  }
};


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
