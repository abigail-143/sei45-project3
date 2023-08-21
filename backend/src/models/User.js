const mongoose = require("mongoose");
const ContentSchema = require("./Content");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minLength: 5, maxLength: 20 },
    hashPWD: { type: String, required: true },
    profilePhoto: { type: String },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UsersSchema);
