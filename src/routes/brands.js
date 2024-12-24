const express = require('express');
const router = express.Router();

// Sample brands (replace with database)
const brands = Array(10).fill().map((_, i) => ({
  id: i + 1,
  name: `Brand ${i + 1}`,
  description: `Description for Brand ${i + 1}`
}));

// Get all brands
router.get('/', (req, res) => {
  res.json(brands);
});

// Get brand by ID
router.get('/:id', (req, res) => {
  const brand = brands.find(b => b.id === Number(req.params.id));
  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }
  res.json(brand);
});

module.exports = router;