const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
