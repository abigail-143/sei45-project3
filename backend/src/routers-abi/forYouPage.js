const express = require("express");
const {
  // seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
} = require("../controllers/forYouPage");
const { auth } = require("../middleware/user");
const router = express.Router();

// router.get("/seed-users", seedUsers);
router.get("/seed-contents", seedContents);
router.get("/all-contents", auth, getAllContents);
router.post("/:contentId", auth, getOneContentByContentID);
router.patch("/:contentId", auth, addToLikeCount);

router.patch("/comments/:contentId", addCommentToContent);
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
