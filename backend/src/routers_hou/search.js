const express = require("express");
const router = express.Router();

const searchFunction = require("../controllers/search");

router.get("/search", searchFunction);

module.exports = router;
