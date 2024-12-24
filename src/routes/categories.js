const express = require('express');
const router = express.Router();
const CATEGORIES = require('../constants/categories');

// Categories with descriptions
const categories = [
  { id: 1, name: CATEGORIES.CLOTHES, description: 'Fashion and apparel' },
  { id: 2, name: CATEGORIES.SHOES, description: 'Footwear' },
  { id: 3, name: CATEGORIES.FOOD, description: 'Food and beverages' },
  { id: 4, name: CATEGORIES.LAPTOPS, description: 'Computers and accessories' },
  { id: 5, name: CATEGORIES.CARS, description: 'Automobiles and vehicles' },
  { id: 6, name: CATEGORIES.ELECTRONICS, description: 'Electronic devices and gadgets' }
];

// Get all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// Get category by ID
router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === Number(req.params.id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

module.exports = router;