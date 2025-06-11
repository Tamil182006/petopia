// routes/sellerRoutes.js
const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");

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

module.exports = router;
