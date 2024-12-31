const propertiesDao = require('../daos/properties');
const { toLowerCase } = require('../utils/formatText');

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

async function getPropertiesByCategoryData(Location, HousingType, Pricing) {
  const filterCriteria = {};

  // Define filter logic based on (Location)
  if (Location) {
    lowerCaseLocation = toLowerCase(Location);
    filterCriteria.area = lowerCaseLocation;
  }

  // Define filter logic based on (HousingType)
  if (HousingType) {
    filterCriteria.propertyType = HousingType;
  }

  // Define filter logic based on (Pricing)
  if (Pricing) {
    filterCriteria.price = { $gt: Pricing };
  }

  // Fetch data with filter and sort criteria
  return await propertiesDao.find(filterCriteria);
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
