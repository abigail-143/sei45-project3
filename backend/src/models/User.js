const mongoose = require("mongoose");
const ContentSchema = require("./Content");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minLength: 5, maxLength: 20 },
    hashPWD: { type: String, required: true },
    profilePhoto: {
      type: String,
      default:
        "https://vinepair.com/wp-content/uploads/2018/07/brewdog-pawty-social.jpg",
    },
    likedContent: { type: Array }, // array of content _ids that user likes
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UsersSchema);
