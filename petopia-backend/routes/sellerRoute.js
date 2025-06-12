// routes/sellerRoutes.js
const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const Pet = require("../models/Pet");

router.post("/signup", async (req, res) => {
  try {
    const newSeller = new Seller(req.body);
    await newSeller.save();
    res.status(200).json({ message: "Seller registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const seller = await Seller.findOne({
      $or: [{ email: username }, { mobile: username }],
      password,
    });

    if (!seller) {
      return res.status(401).json({ message: "Invalid seller credentials" });
    }

    res.status(200).json({ message: "Seller login successful", seller });
  } catch (error) {
    console.error('Error during seller login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post("/listpet", async (req, res) => {
  try {
    const { name, breed, age, price, description, imageUrl, category, sellerId } = req.body;

    const newPet = new Pet({
      name,
      breed,
      age,
      price,
      description,
      imageUrl,
      category,
      sellerId, // Optional: Pass sellerId if needed
    });

    await newPet.save();
    res.status(201).json({ message: "Pet listed successfully", pet: newPet });
  } catch (err) {
    console.error("Error listing pet:", err);
    res.status(500).json({ message: "Failed to list pet" });
  }
});

module.exports = router;
