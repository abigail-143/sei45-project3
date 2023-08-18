const express = require("express");
const {
  seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
} = require("../controllers/forYouPage");
const router = express.Router();

router.get("/seed-users", seedUsers);
router.get("/seed-contents", seedContents);
router.get("/all-contents", getAllContents);
router.post("/:contentId", getOneContentByContentID);
router.patch("/:contentId", addToLikeCount);

module.exports = router;
