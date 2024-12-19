const express = require('express');
const router = express.Router();
const propertiesCtrl = require('../controllers/properties');

// GET all Properties
router.get('/', propertiesCtrl.getAllProperties);

// GET a single product by ID
router.get('/property/:id', propertiesCtrl.getPropertyById);

// GET all products based on CategoryName
router.get('/category/:category', propertiesCtrl.getPropertiesByCategory);

// POST create a new Property
router.post('/create', propertiesCtrl.createProperty);

// PUT update an existing Property by ID
router.put('/update/:id', propertiesCtrl.updateProperty);

// DELETE a Property by ID
router.delete('/delete/:id', propertiesCtrl.deleteProperty);


module.exports = router;
