const ContentModel = require("../models/Content");
const CommentModel = require("../models/Comment");
const UserModel = require("../models/User");

const seedUsers = async (req, res) => {
  try {
    await UserModel.deleteMany();

    await UserModel.create(
      {
        username: "user1",
        hashPWD: "user1",
        profilePhoto: "profile.jpg",
      },
      {
        username: "user2",
        hashPWD: "user2",
        profilePhoto: "profile.jpg",
      }
    );

    res.json({ status: "ok", msg: "seed user successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "seed user error." });
  }
};

const seedContents = async (req, res) => {
  try {
    await ContentModel.deleteMany();

    await ContentModel.create(
      {
        contentPhoto: "photo.jpg",
        drinkName: "drink1",
        shopName: "shop1",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bc",
      },
      {
        contentPhoto: "photo.jpg",
        drinkName: "drink2",
        shopName: "shop2",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bc",
      },
      {
        contentPhoto: "photo.jpg",
        drinkName: "drink3",
        shopName: "shop3",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bd",
      }
    );

    res.json({ status: "ok", msg: "seed content successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", msg: "seed content error." });
  }
};

// GET - all content from all users
const getAllContents = async (req, res) => {
  try {
    const allContents = await ContentModel.find();
    res.json(allContents);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "failed to retrieve content data." });
  }
};

// POST - get 1 content by contentId parma
const getOneContentByContentID = async (req, res) => {
  try {
    const uniqueContent = await ContentModel.findById(req.params.contentId);
    res.json(uniqueContent);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: "failed to retrieve content." });
  }
};

// PATCH - add a like count to content through contentId param
const addToLikeCount = async (req, res) => {
  try {
    const addLikeCount = await ContentModel.findByIdAndUpdate(
      req.params.contentId
    );
  } catch (error) {}
};

module.exports = {
  seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
};
