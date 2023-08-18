// create controller for all content
const Content = require("../models/Content");
const ContentModel = require("../models/Content");
const UserModel = require("../models/User");

// create new content
const createNewContent = async (req, res) => {
  try {
    const userId = await UserModel.findById(req.params.id);

    const content = new ContentModel({
      contentPhoto: req.body.contentPhoto,
      drinkName: req.body.drinkName,
      shopName: req.body.shopName,
      contentReview: req.body.contentReview,
      contentTag: req.body.contentTag,
      comments: req.body.comments,
      likeCount: req.body.likeCount,
      userID: userId._id,
    });

    userId.createdContent.push(content);
    await content.save();
    await userId.save();
    // res.json(content);
    res.json(userId);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//delete user's content
const deleteContent = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    await user.ContentModel.findByIdAndDelete(req.body.id);

    res.json({ status: "ok", msg: "Content deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the user's content
const getContent = async (req, res) => {
  try {
    const content = await UserModel.findById(req.params.id);
    res.json(content.createdContent);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//update user's content
const updateContent = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};


module.exports = {
  getContent,
  createNewContent,
  deleteContent,
  updateContent,
};
