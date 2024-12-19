const agentsDao = require('../daos/agents.js');

module.exports = {
  getAllAgentsData,
  getAgentByIdData,
  getAgentsByCategoryData,
  createAgentData,
  updateAgentData,
  deleteAgentData,
};

async function getAllAgentsData() {
  return await agentsDao.find({});
}

async function getAgentByIdData(id) {
  return await agentsDao.findById(id);
}

async function getAgentsByCategoryData(param1, param2, param3) {
  return await agentsDao.find(param1, param2, param3);
}

async function createAgentData(data) {
  return await agentsDao.create(data);
}

async function updateAgentData(id, data) {
  return await agentsDao.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAgentData(id) {
  return await agentsDao.findByIdAndDelete(id);
}
