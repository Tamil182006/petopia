// models/Seller.js
const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  email: String,
  mobile: String,
  category: String,
  gstin: String,
  password: String,
  fullName: String,
  displayName: String,
  description: String,
  pickupName: String,
  pickupPhone: String,
  pickupPincode: String,
  pickupStateCity: String,
  pickupAddress: String,
});

module.exports = mongoose.model("Seller", sellerSchema);
