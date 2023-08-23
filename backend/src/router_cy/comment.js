const express = require("express");
const router = express.Router();
const {
  newComment,
  deleteComment,
  updateComment,
  getAllComment,
  seedComments,
} = require("../controllers/comment");
const { auth } = require("../middleware/user");
const { getUser } = require("../controllers/content");
const { validateAddCommentData } = require("../validators/validataComment");

//create new comment by owner user or other user
router.put("/newComment/:id", auth, validateAddCommentData ,newComment);

//delete user comment
router.delete("/deleteComment/:id", auth, deleteComment);

//edit user comment
router.patch("/userUpdateComment/:id", auth, updateComment);

//get out all the comment from teh content
router.get("/getAllComment", getAllComment);

router.get("/seed", seedComments);

module.exports = router;
