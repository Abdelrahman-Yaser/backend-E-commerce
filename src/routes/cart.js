const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// In-memory storage (replace with database)
const carts = new Map();

// Add to cart
router.post('/add', auth, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  
  if (!carts.has(userId)) {
    carts.set(userId, []);
  }
  
  const cart = carts.get(userId);
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  res.json(cart);
});

// Get cart
router.get('/', auth, (req, res) => {
  const userId = req.user.id;
  const cart = carts.get(userId) || [];
  res.json(cart);
});

// Update cart item
router.put('/update', auth, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  
  if (!carts.has(userId)) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const cart = carts.get(userId);
  const item = cart.find(item => item.productId === productId);
  
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  item.quantity = quantity;
  res.json(cart);
});

// Remove from cart
router.delete('/remove/:productId', auth, (req, res) => {
  const userId = req.user.id;
  const productId = Number(req.params.productId);
  
  if (!carts.has(userId)) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const cart = carts.get(userId);
  const updatedCart = cart.filter(item => item.productId !== productId);
  carts.set(userId, updatedCart);
  
  res.json(updatedCart);
});

module.exports = router;