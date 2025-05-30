require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB connected successfully!');
  })
  .catch((err) => console.error(' MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('Connected to DB:', mongoose.connection.name);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
