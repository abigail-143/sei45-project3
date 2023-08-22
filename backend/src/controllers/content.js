// create controller for content
const ContentModel = require("../models/Content");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");

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

//delete user's content
const deleteContent = async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id);
    const deleteContent = req.params.id;
    const likedUsers = content.likedUsersId;

    const users = await UserModel.find({ _id: { $in: likedUsers } });

    for (const user of users) {
      const index = user.likedContent.indexOf(deleteContent);
      //if the content_id need to take out from prticular user detail which no exist will return -1
      // if index return not -1 will excute the following action splice out the content_id
      if (index !== -1) {
        user.likedContent.splice(indexToRemove, 1);
        await user.save();
      }

      await ContentModel.findByIdAndDelete(req.params.id);

      res.json({ status: "ok", msg: "Content deleted" });
    }
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
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

//get particular content
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
    const user = await UserModel.findById(req.user_id);
    res.json(user);
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

// get all the favourite content
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
  updateContent,
  getAllUserContent,
  getParticularComment,
  updateProfile,
  addFavouriteContent,
  singleContent,
  allFavouriteContent,
  getUser,
};
