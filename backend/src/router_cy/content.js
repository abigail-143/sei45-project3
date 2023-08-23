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
const { validateAddContentData } = require("../validators/validateContent");

//get out all the content that user created
router.get("/getCreatedContent/:id", getContent);

//user create new content
router.put("/putNewContent", validateAddContentData, auth, createNewContent);

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
router.patch("/addFavourite/:id", auth, addFavouriteContent);

// get individual content
router.post("/singleContent/:id", auth, singleContent);

// get out data that user's favourite content
router.get("/allFavourite/:id", allFavouriteContent);

// ==============ignore============================

// router.post("/upload/image",uploadCheck.single('avatar'), uploadImage);

// router.get("/images", getImage);

router.post("/getUser", auth, getUser);

module.exports = router;
