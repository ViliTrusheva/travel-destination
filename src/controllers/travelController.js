const Travel = require("../models/travelModel");

// Get all travels with error handling and response formatting
const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find();  // Fetch all travels from the database
    res.status(200).json({
      success: true,
      count: travels.length,
      data: travels,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch travels",
    });
  }
};


module.exports = { getTravels };
