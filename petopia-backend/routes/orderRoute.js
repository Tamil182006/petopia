const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders — Save new order
router.post("/", async (req, res) => {
  console.log("Raw req.body:", req.body);
  console.log("Type of req.body.items:", typeof req.body.items);
  console.log("Is req.body.items array?", Array.isArray(req.body.items));

  if (typeof req.body.items === "string") {
    try {
      req.body.items = JSON.parse(req.body.items);
      console.log("Parsed items:", req.body.items);
    } catch (e) {
      console.error("Failed to parse items as JSON:", e);
      return res.status(400).json({ message: "Invalid items format" });
    }
  }

  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
