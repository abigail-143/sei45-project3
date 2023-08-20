const express = require("express");
const {
  // seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
  addCommentToContent,
  deleteComment,
  findContentWithSpecifcComment,
} = require("../controllers/forYouPage");
const { auth } = require("../middleware/user");
const router = express.Router();

router.get("/seed-contents", auth, seedContents);
router.get("/all-contents", auth, getAllContents);
router.post("/:contentId", auth, getOneContentByContentID);
router.patch("/:contentId", auth, addToLikeCount);

module.exports = router;
