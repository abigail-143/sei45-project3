const express = require("express");
const router = express.Router();
const {
  getContent,
  createNewContent,
  deleteContent,
  updateContent,
} = require("../controllers/content");

router.get("/user/createdContent/:id", getContent);
router.put("/user/createNewContent/:id", createNewContent);
router.delete("/user/deleteContent/:id", deleteContent);
router.patch("/user/updateContent/:id", updateContent);

module.exports = router;
