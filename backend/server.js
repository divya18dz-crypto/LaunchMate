require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Vite default
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Deployed URL
].filter(Boolean);

app.use(cors({
  origin: true, // Allow all origins for the competition to ensure it works
  credentials: true
}));
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
const ideaRoutes = require('./routes/ideas');
app.use('/api/ideas', ideaRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'An internal server error occurred' 
      : err.message
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("CRITICAL ERROR: MONGO_URI is not defined in your .env file!");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
