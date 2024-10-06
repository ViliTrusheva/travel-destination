const express = require("express");
const router = express.Router();
const Travel = require("../models/travelModel"); 

//get
router.get("/", async (req, res) => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
