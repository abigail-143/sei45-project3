const mongoose = require("mongoose");
const CommentSchema = require("./Comment");

const ContentsSchema = new mongoose.Schema(
  {
    contentPhoto: { type: String, required: true },
    drinkName: { type: String, required: true, maxLength: 30 },
    shopName: { type: String, maxLength: 30 },
    contentReview: { type: String, maxLength: 200 },
    contentTag: { type: String, maxLength: 30 },
    likeCount: { type: Number },
    likedUsers: {type: [mongoose.Types.ObjectId]},
    userId: { type: mongoose.Types.ObjectId, ref: "User._id" },
  },
  { collection: "Content" }
);

module.exports = mongoose.model("Content", ContentsSchema);
