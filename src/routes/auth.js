const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const users = []; // In-memory storage (replace with database)

// Signup
router.post('/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;
      
      // Check if user exists
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
      };
      users.push(user);

      // Create token
      const token = jwt.sign(
        { userId: user.id },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      
      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign(
        { userId: user.id },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

// Reset Password Request
router.post('/reset-password-request',
  [body('email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id },
        'reset_secret',
        { expiresIn: '1h' }
      );

      // In a real app, send email with reset link
      res.json({ message: 'Reset password link sent to email' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;