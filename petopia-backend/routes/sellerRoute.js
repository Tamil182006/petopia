const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const Pet = require("../models/Pet");

// Seller Signup
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

// Seller Login
router.post("/login", async (req, res) => {
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
    console.error("Error during seller login:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Step 1 - List Basic Pet Info
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
      sellerId,
    });

    await newPet.save();
    console.log("✅ Pet listed:", newPet);

    res.status(201).json({
      message: "Pet listed successfully",
      petId: newPet._id,
    });
  } catch (err) {
    console.error("Error listing pet:", err);
    res.status(500).json({ message: "Failed to list pet" });
  }
});

// Get all pets (MainPage)
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find().sort({ listedAt: -1 });
    res.status(200).json({ pets });
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ message: "Failed to fetch pets" });
  }
});

// Step 2 - Update Pet with Detailed Info
router.put("/updatepet/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet updated successfully", pet: updatedPet });
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ message: "Failed to update pet" });
  }
});

// ✅ Get a single pet by ID (PetDetail Page)
router.get("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error fetching pet:", err);
    res.status(500).json({ message: "Failed to fetch pet" });
  }
});

module.exports = router;
