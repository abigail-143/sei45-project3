const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minLength: 5, maxLength: 20 },
    hashPWD: { type: String, required: true },
    profilePhoto: { type: String },
    createdContent: [{ type: mongoose.Types.ObjectId, ref: "Content" }],
    likedContent: [{ type: mongoose.Types.ObjectId, ref: "Content" }],
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UsersSchema);
