const express = require('express');
const { submitForm } = require('../controllers/formController');

const router = express.Router();

// Route to submit form
router.post('/submit', submitForm);

module.exports = router;
