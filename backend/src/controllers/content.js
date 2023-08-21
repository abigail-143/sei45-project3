// create controller for all content
const Content = require("../models/Content");
const ContentModel = require("../models/Content");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");
const User = require("../models/User");
// const ImageModel = require("../models/Image");
var fs = require("fs");
var path = require("path");

// create new content
const createNewContent = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    const content = new ContentModel({
      contentPhoto: req.body.contentPhoto,
      drinkName: req.body.drinkName,
      shopName: req.body.shopName,
      contentReview: req.body.contentReview,
      contentTag: req.body.contentTag,
      comments: req.body.comments,
      likeCount: req.body.likeCount,
      userId: req.params.id,
    });
    await content.save();

    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//delete user's content
const deleteContent = async (req, res) => {
  try {
    await ContentModel.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "Content deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the user's content
const getContent = async (req, res) => {
  try {
    const content = await ContentModel.find({ userId: req.params.id });
    res.json(content);
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

//get all the user's content
const getAllUserContent = async (req, res) => {
  try {
    const content = await ContentModel.find();
    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//update user's content
const updateContent = async (req, res) => {
  try {
    await ContentModel.findByIdAndUpdate(req.params.id, {
      contentPhoto: req.body.contentPhoto,
      drinkName: req.body.drinkName,
      shopName: req.body.shopName,
      contentReview: req.body.contentReview,
      contentTag: req.body.contentTag,
      likeCount: req.body.likeCount,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get particular content
const singleContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.body.id);
    res.json(content);
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

const createAccount = async (req, res) => {
  try {
    const account = new UserModel({
      username: req.body.username,
      hashPWD: req.body.hashPWD,
    });

    await account.save();
    res.json(account);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get prticular detail
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    res.json(user);
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

// get comment that attach with particular content
const getParticularComment = async (req, res) => {
  try {
    const comment = await CommentModel.find({ contentId: req.params.id });
    res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// add favourite content attach to my
const addFavouriteContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);

    const favourite = new ContentModel({
      likedUsers: req.user_id,
    });

    content.likedUsers.push(favourite);

    res.json({ status: "ok", msg: "favorite content has been saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get all the favourite content
const allFavouriteContent = async (req, res) => {
  try {
    const content = await ContentModel.find({likedUsers: {$elemMatch: req.user_id}})
    // const user = await UserModel.findById(req.params.id);

    // const likedContent = user.likedContent;
    // for (const content of likedContent) {
    //   const displayContent = await ContentModel.findById(content);
    //   res.json(displayContent);
    // }
    res.json(content)
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//update user profile
const updateProfile = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      profilePhoto: req.body.profilePhoto,
    });
    res.json({ status: "ok", msg: "Profile has been updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// still figure out how to upload and get image
// const uploadImage = async (req, res, next) => {
//   const obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgSchema.create(obj).then((err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // item.save();
//       res.redirect("/");
//     }
//   });
// };

// res.send(upload);

// const getImage = async (req, res) => {
//   try {
//     const image = await ImageModel.find();

//     res.send(image);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error Something went wrong",
//       error,
//     });
//   }
// };

module.exports = {
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
  addFavouriteContent,
  singleContent,
  allFavouriteContent,
};

