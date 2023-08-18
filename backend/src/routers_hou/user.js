const express = require("express");
const router = express.Router();

const { register, login, seedUsers } = require("../controllers/user");

const validCheck = require("../middleware/validCheck");

const { validateLogin, validateRegData } = require("../validators/user");

const auth = require("../middleware/user");

router.put("/register", validateRegData, validCheck, register);
router.post("/login", validateLogin, validCheck, login);

// seed endpoint for backend testing
router.get("/seed", seedUsers);
module.exports = router;
