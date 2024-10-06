const express = require("express");
const router = express.Router();

const { loginUser, registerUser, updatePassword } = require('../controllers/authController');
const { protect } = require("../middlewares/authMiddleware");
// POST
//Register a new user
router.post("/register", registerUser);
//login
router.post('/login', loginUser);

//UPDATE
router.put("/password", protect, updatePassword);

module.exports = router;
