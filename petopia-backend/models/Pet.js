// models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  price: Number,
  description: String,
  imageUrl: String,
  category: String,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
  },
  listedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pet', petSchema);
