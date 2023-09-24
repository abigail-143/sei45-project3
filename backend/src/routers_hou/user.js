const express = require("express");
const router = express.Router();

const {
  register,
  login,
  seedUsers,
  resetPassword,
} = require("../controllers/user");

const validCheck = require("../middleware/validCheck");

const {
  validateLogin,
  validateRegData,
  validateResetData,
} = require("../validators/user");

const auth = require("../middleware/user");

router.put("/register", validateRegData, validCheck, register);
router.post("/login", validateLogin, validCheck, login);
router.post("/reset", validateResetData, validCheck, resetPassword);

// seed endpoint for backend testing
router.get("/seed", seedUsers);
module.exports = router;
