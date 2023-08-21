const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    comment: { type: String, maxLength: 100 },
    userId: { type: mongoose.Types.ObjectId, ref: "User" }, // user that created comment
    contentId: { type: mongoose.Types.ObjectId, ref: "Content" }, // content that is comment is made for
  },
  { collection: "Comment" }
);

module.exports = mongoose.model("Comment", CommentsSchema);