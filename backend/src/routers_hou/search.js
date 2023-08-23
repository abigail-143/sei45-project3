const express = require("express");
const router = express.Router();

const searchFunction = require("../controllers/search");

router.post("/search", searchFunction);

module.exports = router;
