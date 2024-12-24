const { 
  getAllProducts, 
  getProductById, 
  searchProducts, 
  getProductsByCategory,
  getRelatedProducts,
  getFeaturedProducts
} = require('../services/productService');

// Product controllers
const productController = {
  // Get all products with filtering
  getProducts: (req, res) => {
    const { category, brand, minPrice, maxPrice, search, sort } = req.query;
    const products = getAllProducts({ category, brand, minPrice, maxPrice, sort });
    
    if (search) {
      return res.json(searchProducts(products, search));
    }
    res.json(products);
  },

  // Get single product
  getProduct: (req, res) => {
    const product = getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  },

  // Get products by category
  getProductsByCategory: (req, res) => {
    const products = getProductsByCategory(req.params.category);
    res.json(products);
  },

  // Get related products
  getRelatedProducts: (req, res) => {
    const productId = Number(req.params.id);
    const products = getRelatedProducts(productId);
    res.json(products);
  },

  // Get featured products
  getFeaturedProducts: (req, res) => {
    const products = getFeaturedProducts();
    res.json(products);
  }
};

module.exports = productController;