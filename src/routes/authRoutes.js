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
const path = require('path');
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
      // original name and add timestamp to avoid name conflicts
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: fileStorageEngine });

const { protect } = require("../middlewares/authMiddleware");
// POST
//Register a new user
router.post("/register", registerUser);
//login
router.post("/login", loginUser);
//create new travel
router.post("/travel", protect, upload.single('image'), createTravel);

//UPDATE
router.put("/password", protect, updatePassword);
router.put("/travel/:id", protect, updateTravel);

//DELETE
router.delete("/travel/:id", protect, deleteTravel);

module.exports = router;
