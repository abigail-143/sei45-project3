const mongoose = require("mongoose");

const ContentsSchema = new mongoose.Schema(
  {
    contentPhoto: { type: String, required: true },
    drinkName: { type: String, required: true, maxLength: 30 },
    shopName: { type: String, maxLength: 30 },
    contentReview: { type: String, maxLength: 200 },
    contentTag: { type: String, maxLength: 30 },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likeCount: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { collection: "Content" }
);

module.exports = mongoose.model("Content", ContentsSchema);
