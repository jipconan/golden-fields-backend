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

async function getAgentsByCategoryData(Names, Experience, Languages) {
  // Define sorting logic based on (Names)
  const sortCriteria = {};
  if (Names === 'Sort Z-A') {
    sortCriteria.name = -1; 
  } else if (Names === 'Sort A-Z') {
    sortCriteria.name = 1; 
  } else if (Names === 'Sort by First Name') {
    sortCriteria.firstName = 1;
  } else if (Names === 'Sort by Last Name') {
    sortCriteria.lastName = 1;  
  }

   // Define filter logic based on (Experience)
  const filterCriteria = {};
  if (Experience) {
    filterCriteria.experience = { $gt: Experience };
  }
  // Define filter logic based on (Languages)
  if (Languages) {
    filterCriteria.languages = { $in: Languages };
  }

  // Fetch data with filter and sort criteria
  return await agentsDao.find(filterCriteria).sort(sortCriteria);
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
