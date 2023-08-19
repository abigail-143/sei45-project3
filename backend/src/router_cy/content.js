const express = require("express");
const router = express.Router();
const uploadCheck = require('../middleware/uploadCheck')
const {
  getContent,
  createNewContent,
  deleteContent,
  createAccount,
  getUser,
  updateContent,
  getAllUserContent,
  newComment,
  deleteComment,
  updateComment,
  getAllComment,
  getParticularComment,
  updateProfile,
  favouriteContent,
  // uploadImage,
  // getImage,
} = require("../controllers/content");

//get out all the content that user created
router.get("/getCreatedContent/:id", getContent);

//user create new content
router.put("/putNewContent/:id", createNewContent);

//user delete his own content
router.delete("/delContent/:id", deleteContent);

//user update his own content
router.patch("/updateContent/:id", updateContent);

//get out all the content inside content collection
router.get("/getAllUserContent", getAllUserContent);

//create new comment by owner user or other user
router.put("/newComment/:id", newComment);

//delelte user comment
router.delete("/deleteComment/:id", deleteComment);

//edit user comment
router.patch("/userUpdateComment/:id", updateComment);

//get out all the comment from comment collection
router.get("/getAllComment", getAllComment);

// get the particulr content's comment
router.post("/getParticularComment/:id", getParticularComment);

// update user profile
router.patch("/updateProfile", updateProfile);

// add favourite content
router.patch("/addFavourite", favouriteContent);


// ==============ignore============================

// router.post("/upload/image",uploadCheck.single('avatar'), uploadImage);

// router.get("/images", getImage);

// //
// router.put("/user", createAccount);
// router.get("/alluser", getUser);

module.exports = router;
