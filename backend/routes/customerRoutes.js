const express = require("express");
const Customer = require("../models/Customer");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post("/", auth, async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, owner: req.user });
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Read all
router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find({ owner: req.user });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: "Not found" });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      owner: req.user
    });
    if (!customer) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid request" });
  }
});

module.exports = router;
