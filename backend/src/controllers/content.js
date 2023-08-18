// create controller for all content
const ContentModel = require("../models/Content");
const UserModel = require("../models/User");

// create new content
const createNewContent = async (req, res) => {
  try {
    const userId = UserModel.findById(req.params.user_id);

    const content = new ContentModel({
      contentPhoto: req.body.contentPhoto,
      contentPhoto: req.body.contentPhoto,
      shopName: req.body.shopName,
      contentReview: req.body.contentReview,
      contentTag: req.body.contentTag,
      comments: req.body.comments,
      likeCount: req.body.likeCount,
    });

    userId.ContentModel.push(content);

    await userId.save();

    res.json(userId);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//delete user's content
const deleteContent = async (req, res) => {
  try {
    await ContentModel.findByIdAndDelete(req.params.user._id);
    res.json({ status: "ok", msg: "Content deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the user's content
// const getContent = async (req, res) => {
//   try {
//     const content = await UserModel.find();
//     res.json(content);
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: error.message });
//   }
// };

module.exports = { getContent, createNewContent, deleteContent };
