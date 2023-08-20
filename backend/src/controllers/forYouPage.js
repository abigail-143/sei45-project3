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

// GET - to seed test data for Contents
const seedContents = async (req, res) => {
  try {
    await ContentModel.deleteMany();

    const contents = await ContentModel.create(
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

// PATCH - to add a comment to content through contentId param
const addCommentToContent = async (req, res) => {
  try {
    // get the content to add comment to
    const content = await ContentModel.findById(req.params.contentId);
    // create a new comment in Comment Model
    const comment = await CommentModel.create({
      comment: req.body.comment,
      contentId: req.params.contentId,
      userId: content.userId,
    });
    // add the new comment to the content
    content.comments.push(comment);
    await content.save();
    res.json({ status: "ok", msg: "comment added" });
  } catch (error) {
    console.log(error),
      res.status(400).json({ status: "error", msg: "fail to add comment" });
  }
};

// DELETE - to delete a comment from content using commentId
const deleteComment = async (req, res) => {
  try {
    // delete comment from the Comment Model
    await CommentModel.findByIdAndDelete(req.params.commentId);
    // delete comment from the Content Model
    await ContentModel.updateOne(
      {},
      { $pull: { comments: { _id: req.params.commentId } } }
    );
    res.json({ status: "ok", msg: "comment deleted from Comment and Content" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "fail to delete comment" });
  }
};

// GET - to find in nested array
const findContentWithSpecifcComment = async (req, res) => {
  try {
    const contents = await ContentModel.find({
      "comments": { $elemMatch: { "comment": req.body.comment } },
    });

    res.json(contents);

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot find comment" });
  }
};

module.exports = {
  seedUsers,
  seedContents,
  getAllContents,
  getOneContentByContentID,
  addToLikeCount,
  addCommentToContent,
  deleteComment,
  findContentWithSpecifcComment,
};
