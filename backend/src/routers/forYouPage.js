const express = require("express");
const { seedUsers, seedContents, getAllContents, getOneContentByContentID } = require("../controllers/forYouPage");
const router = express.Router();

router.get("/seed-users", seedUsers);
router.get("/seed-contents", seedContents);
router.get("/all-contents", getAllContents)
router.post("/:contentId", getOneContentByContentID)

module.exports = router;
