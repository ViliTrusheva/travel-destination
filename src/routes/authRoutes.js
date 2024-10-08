const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  updatePassword,
  createTravel,
  deleteTravel,
  updateTravel,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
// POST
//Register a new user
router.post("/register", registerUser);
//login
router.post("/login", loginUser);
//create new travel
router.post("/travel", protect, createTravel);

//UPDATE
router.put("/password", protect, updatePassword);
router.put("/travel/:id", protect, updateTravel);

//DELETE
router.delete("/travel/:id", protect, deleteTravel);

module.exports = router;
