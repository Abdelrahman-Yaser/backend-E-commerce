const CATEGORIES = require('../constants/categories');
const { generateProductImages } = require('../utils/imageGenerator');

// Helper function to generate products
function generateProducts(category, startId, count, priceRange) {
  return Array(count).fill().map((_, i) => ({
    id: startId + i,
    name: `${category} ${i + 1}`,
    category,
    brand: `Brand ${Math.floor(i/10) + 1}`,
    price: Math.floor(Math.random() * (priceRange.max - priceRange.min)) + priceRange.min,
    description: `${category} description ${i + 1}`,
    stock: Math.floor(Math.random() * 50) + 10,
    images: generateProductImages(category, i + 1)
  }));
}

const products = [
  ...generateProducts(CATEGORIES.CLOTHES, 1, 25, { min: 20, max: 120 }),
  ...generateProducts(CATEGORIES.SHOES, 26, 25, { min: 50, max: 200 }),
  ...generateProducts(CATEGORIES.FOOD, 51, 25, { min: 5, max: 35 }),
  ...generateProducts(CATEGORIES.LAPTOPS, 76, 25, { min: 500, max: 1500 }),
  ...generateProducts(CATEGORIES.CARS, 101, 25, { min: 25000, max: 100000 }),
  ...generateProducts(CATEGORIES.ELECTRONICS, 126, 50, { min: 100, max: 2000 }) // Added 50 electronics products
];

module.exports = products;