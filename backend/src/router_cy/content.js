const express = require("express");
const router = express.Router();
const {
  getContent,
  createNewContent,
  deleteContent,
  updateContent,
  getAllUserContent,
  getParticularComment,
  updateProfile,
  singleContent,
  addFavouriteContent,
  allFavouriteContent,
  getUser,
  // uploadImage,
  // getImage,
} = require("../controllers/content");
const { auth } = require("../middleware/user");



//get out all the content that user created
router.get("/getCreatedContent/:id", auth, getContent);

//user create new content
router.put("/putNewContent/:id", createNewContent);

//user delete his own content
router.delete("/delContent/:id", deleteContent);

//user update his own content
router.patch("/updateContent/:id", updateContent);

//get out all the content inside content collection
router.get("/getAllUserContent", getAllUserContent);

// get the particulr content's comment
router.post("/getParticularComment/:id", getParticularComment);

// update user profile
router.patch("/updateProfile", updateProfile);

// add contentId into user model likedContent
router.patch("/addFavourite/:id", addFavouriteContent);

// get individual content
router.post("/singleContent/:id", singleContent);

// get out data that user's favourite content
router.get("/allFavourite", allFavouriteContent);

// ==============ignore============================

// router.post("/upload/image",uploadCheck.single('avatar'), uploadImage);

// router.get("/images", getImage);

router.post('/getUser', getUser)



module.exports = router;
