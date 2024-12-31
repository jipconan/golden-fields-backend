const propertiesModel = require('../models/properties');
const { toLowerCase } = require('../utils/formatText');

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};

async function getProperties(req, res) {
  try {
    const { Location, 'Housing Type': HousingType, Pricing } = req.query;
  
    let data;

    if (Location || HousingType || Pricing) {
      // console.log(Location, HousingType, Pricing);
  
      // Fetch data based on available params
      data = await propertiesModel.getPropertiesByCategoryData(
        Location,
        HousingType,
        Pricing
      );
      
      if (!data || data.length === 0) {
        return res.status(404).json({ message: 'No properties found for this category' });
      }
    } else {
      // Fetch all properties if no filters are applied
      data = await propertiesModel.getAllPropertiesData();
    }
    // Ensure you're sending the data variable here
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching properties:", error);
    if (!res.headersSent) {  // prevent sending multiple responses
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  }
};

async function getPropertyById(req, res) {
  try {
    const data = await propertiesModel.getPropertyByIdData(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Property ID not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve property' });
  }
}

async function createProperty(req, res) {
  try {
    const newData = await propertiesModel.createPropertyData(req.body);
    res.status(201).json(newData);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create property' });
  }
}

async function updateProperty(req, res) {
  try {
    const updatedData = await propertiesModel.updatePropertyData(req.params.id, req.body);
    if (!updatedData) {
      return res.status(404).json({ message: 'Property ID not found' });
    }
    res.status(200).json(updatedData);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update property' });
  }
}

async function deleteProperty(req, res) {
  try {
    const result = await propertiesModel.deletePropertyData(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Property ID not found' });
    }
    res.status(204).end(); // No content
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete property' });
  }
}
