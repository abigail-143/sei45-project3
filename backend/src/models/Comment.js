const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    comment: { type: String, maxLength: 100 },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    contentId: { type: mongoose.Types.ObjectId, ref: "Content" },

  },
  { collection: "Comment" }
);

module.exports = mongoose.model("Comment", CommentsSchema);