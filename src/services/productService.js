const products = require('../data/productData');

const productService = {
  getAllProducts: ({ category, brand, minPrice, maxPrice, sort }) => {
    let filteredProducts = [...products];
    
    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === brand);
    }
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    return filteredProducts;
  },

  getProductById: (id) => {
    return products.find(p => p.id === id);
  },

  searchProducts: (products, query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
  },

  getProductsByCategory: (category) => {
    return products.filter(p => p.category === category);
  },

  getRelatedProducts: (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    return products
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, 4);
  },

  getFeaturedProducts: () => {
    return products
      .filter(p => p.stock > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }
};

module.exports = productService;