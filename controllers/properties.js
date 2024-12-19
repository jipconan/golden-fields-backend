const propertiesModel = require('../models/properties');
const { toLowerCase } = require('../utils/formatText');

module.exports = {
  getAllProperties,
  getPropertyById,
  getPropertiesByCategory,
  createProperty,
  updateProperty,
  deleteProperty,
};

async function getAllProperties(req, res) {
  try {
    const data = await propertiesModel.getAllPropertiesData();
    res.status(200).json(data);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve properties' });
  }
}

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

async function getPropertiesByCategory(req, res) {
  try {
    const params = ['location', 'propertyType'];
    const lowercaseParams = params.reduce((acc, param) => {
      if (req.params[param]) {
        acc[param] = toLowerCase(req.params[param]);
      }
      return acc;
    }, {});

    const { location: lowercaseLocation, propertyType: lowercasePropertyType } = lowercaseParams;

    // Handle price parameter
    const price = req.params.price ? parseInt(req.params.price, 10) : null;
    if (req.params.price && isNaN(price)) {
      return res.status(400).json({ message: 'Invalid price value' });
    }

    // Call the model with available parameters
    const data = await propertiesModel.getPropertiesByCategoryData(lowercaseLocation, lowercasePropertyType, price);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No properties found for this category' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve properties by category' });
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
