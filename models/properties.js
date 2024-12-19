const propertiesDao = require('../daos/properties');

module.exports = {
  getAllPropertiesData,
  getPropertyByIdData,
  getPropertiesByCategoryData,
  createPropertyData,
  updatePropertyData,
  deletePropertyData,
};

async function getAllPropertiesData() {
  return await propertiesDao.find({});
}

async function getPropertyByIdData(id) {
  return await propertiesDao.findById(id);
}

async function getPropertiesByCategoryData(param1, param2, param3) {
  return await propertiesDao.find(param1, param2, param3);
}

async function createPropertyData(data) {
  return await propertiesDao.create(data);
}

async function updatePropertyData(id, data) {
  return await propertiesDao.findByIdAndUpdate(id, data, { new: true });
}

async function deletePropertyData(id) {
  return await propertiesDao.findByIdAndDelete(id);
}
