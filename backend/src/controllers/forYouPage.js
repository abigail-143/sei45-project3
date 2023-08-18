const ContentModel = require("../models/Content");
const CommentModel = require("../models/Comment");
const UserModel = require("../models/User");

// const seedUsers = async (req, res) => {
//   try {
//     await UserModel.deleteMany();

//     await UserModel.create(
//       {
//         username: "user1",
//         hashPWD: "user1",
//         profilePhoto: "profile.jpg",
//       },
//       {
//         username: "user2",
//         hashPWD: "user2",
//         profilePhoto: "profile.jpg",
//       }
//     );

//     res.json({ status: "ok", msg: "seed user successful" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "seed user error." });
//   }
// };

const seedContents = async (req, res) => {
  try {
    await ContentModel.deleteMany();

    const contents = [
      {
        _id: "64df206ae805e92ed914b43d",
        contentPhoto: "photo1.jpg",
        drinkName: "drink3",
        shopName: "shop1",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bc",
      },
      {
        _id: "64df206ae805e92ed914b43c",
        contentPhoto: "photo2.jpg",
        drinkName: "drin22",
        shopName: "shop2",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bc",
      },
      {
        _id: "64df206ae805e92ed914b43e",
        contentPhoto: "photo3.jpg",
        drinkName: "drink43",
        shopName: "shop3",
        contentReview: "content review",
        likeCount: "0",
        userId: "64dee7d7e713527aee8c75bd",
      },
    ];

    await ContentModel.create(contents);
    // =----------------==================================================

    // ensuring no repeated userId in here
    const uniqueUsers = new Set(contents.map((content) => content.userId));

    for (let uniqueUser of uniqueUsers) {
      const user = await UserModel.findById({ _id: uniqueUser });
      console.log(1);
      user.createdContent = [];
      console.log(2);

      for (let content of contents) {
        if (uniqueUser === content.userId) {
          console.log(content);
          user.createdContent.push(content);
        }
      }
      user.save();
      console.log(user);
    }

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
    const updateLikeCount = await ContentModel.findByIdAndUpdate(
      req.params.contentId,
      {
        $set: { likeCount: req.body.likeCount },
      }
    );

    res.json({ status: "ok", msg: "likes updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "fail to update likes" });
  }
};

module.exports = {
  // seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
};
