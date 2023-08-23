// create controller for content
const ContentModel = require("../models/Content");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");

// create new content (done)
const createNewContent = async (req, res) => {
  try {
    // const user = await UserModel.findById(req.user_id); //check with team

    const content = new ContentModel({
      contentPhoto: req.body.contentPhoto,
      drinkName: req.body.drinkName,
      shopName: req.body.shopName,
      contentReview: req.body.contentReview,
      contentTag: req.body.contentTag,
      userId: req.user_id,
      username: req.username,
    });

    await content.save();
    // userId.createdContent.push(content);
    // await userId.save();
    // res.json(content);
    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//delete user's content (done)
const deleteContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);

    const deleteContentId = content.id;
    const likedUsers = content.likedUsersId;

    const users = await UserModel.find({ _id: { $in: likedUsers } });

    for (const user of users) {
      const index = user.likedContent.indexOf(deleteContentId);
      //if the content_id need to take out from prticular user detail which no exist will return -1
      // if index return not -1 will excute the following action splice out the content_id
      if (index !== -1) {
        user.likedContent.splice(index, 1);
        await user.save();
      }
    }
    await ContentModel.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "Content deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the user's content  (done)
const getContent = async (req, res) => {
  try {
    const content = await ContentModel.find({ userId: req.params.id });
    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get all the content inside collection (done)
const getAllUserContent = async (req, res) => {
  try {
    const content = await ContentModel.find();
    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//update user's content (done)
const updateContent = async (req, res) => {
  try {
    const updateData = {};
    if ("drinkName" in req.body) updateBook.drinkName = req.body.drinkName;
    if ("shopName" in req.body) updateBook.shopName = req.body.shopName;
    if ("contentReview" in req.body)
      updateBook.contentReview = req.body.contentReview;
    if ("contentTag" in req.body) updateBook.contentTag = req.body.contentTag;
    if ("contentTag" in req.body) updateBook.contentTag = req.body.contentTag;

    await ContentModel.findByIdAndUpdate(req.params.id, updateData);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get particular content for content overlay (done)
const singleContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);
    const user = await UserModel.findById(req.user_id);
    console.log(user);
    console.log(content);
    res.json({ user, content });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get particular detail (done)
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user_id);
    res.json({ status: "ok", data: user });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get comment that attach with particular content (done)
const getParticularComment = async (req, res) => {
  try {
    const comment = await CommentModel.find({ contentId: req.params.id });
    res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// store content._id into login user's liked content
// store login user id into content's liked users id   (done)
const addFavouriteContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);

    const favourite = req.user_id;

    content.likedUsersId.push(favourite);

    const user = await UserModel.findById(favourite);
    user.likedContent.push(req.params.id);
    await content.save();
    await user.save();
    res.json(content);
    res.json({ status: "ok", msg: "favorite content has been saved" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get all the favourite content (done)
const allFavouriteContent = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const contentArray = user.likedContent;
    const content = await ContentModel.find({ _id: { $in: contentArray } });
    res.json(content);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//update user profile (done)
const updateProfile = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.id, {
      username: req.body.username,
      // profilePhoto: req.body.profilePhoto,
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
  updateContent,
  getAllUserContent,
  getParticularComment,
  updateProfile,
  addFavouriteContent,
  singleContent,
  allFavouriteContent,
  getUser,
};
