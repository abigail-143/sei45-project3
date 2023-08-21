// create controller for comment

const ContentModel = require("../models/Content");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");

const seedComments = async (req, res) => {
  try {
    await CommentModel.deleteMany();

    await CommentModel.create(
      {
        _id: "64e2fefb143f00c81f42f4a5",
        comment: "This is a comment.",
        userId: "64dee7d7e713527aee8c75bd",
        contentId: "64df206ae805e92ed914b43d",
      },
      {
        _id: "64e2fefb143f00c81f42f4a6",
        comment: "This is a comment 2.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43d",
      },
      {
        _id: "64e2fefb143f00c81f42f4a7",
        comment: "This is a comment 3.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43c",
      },
      {
        _id: "64e2fefb143f00c81f42f4a8",
        comment: "This is a comment 4.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43e",
      }
    );

    res.json({ status: "ok", msg: "seeded" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// create new comment
const newComment = async (req, res) => {
  try {
    await ContentModel.findById(req.params.id);

    const comment = new CommentModel({
      comment: req.body.comment,
      userId: req.user_id,
      contentId: req.params.id,
    });

    await comment.save();

    res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// use to edit comment
const updateComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndUpdate(req.params.id, {
      comment: req.body.comment,
    });
    res.json({ status: "ok", msg: "comment has been update" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//delete individual comment
const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "Content deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the comment from collection
const getAllComment = async (req, res) => {
  try {
    const comment = await CommentModel.find();
    res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  newComment,
  deleteComment,
  getAllComment,
  updateComment,
  seedComments,
};
