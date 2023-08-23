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
        username: "user2",
      },
      {
        _id: "64e2fefb143f00c81f42f4a6",
        comment: "This is a comment 2.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43d",
        username: "user3",
      },
      {
        _id: "64e2fefb143f00c81f42f4a7",
        comment: "This is a comment 3.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43c",
        username: "user3",
      },
      {
        _id: "64e2fefb143f00c81f42f4a8",
        comment: "This is a comment 4.0.",
        userId: "64dee7d7e713527aee8c75be",
        contentId: "64df206ae805e92ed914b43e",
        username: "user3",
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
    //create new comment, save userId tht create this comment
    // and contentId that comment attach to
    const comment = new CommentModel({
      comment: req.body.comment,
      userId: req.user_id,
      username: req.username,
      contentId: req.params.id,
    });
    await comment.save();

    // find out the content detail and push the commentId into comments properties inside the content
    const content = await ContentModel.findById(req.params.id);
    content.comments.push(comment._id);
    await content.save();

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
    //line 85 to 94 is to delete out the comment_id from content itself
    const comment = await CommentModel.findById(req.params.id);
    const contentId = comment.contentId;

    const content = await ContentModel.findById(contentId);

    const index = content.comments.indexOf(req.params.id);
    content.comments.splice(index, 1);
    await content.save();

    // only the content user and comment create user have the right to delete comment
    if (comment.userId === req.user_id || content.userId === req.user_id) {
      return await CommentModel.findByIdAndDelete(req.params.id);
    }
    res.json({ status: "ok", msg: "Comment deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the comment from collection (done)
const getAllComment = async (req, res) => {
  try {
    const comment = await CommentModel.findOne({ contentId: req.params.id });
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
