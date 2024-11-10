const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure correct path and named exports

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
