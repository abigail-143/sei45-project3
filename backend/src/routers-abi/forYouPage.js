const express = require("express");
const {
  seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
  addCommentToContent,
  deleteComment,
} = require("../controllers/forYouPage");
const router = express.Router();

router.get("/seed-users", seedUsers);
router.get("/seed-contents", seedContents);
router.get("/all-contents", getAllContents);
router.post("/:contentId", getOneContentByContentID);
router.patch("/likes/:contentId", addToLikeCount);
router.patch("/comments/:contentId", addCommentToContent);
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
