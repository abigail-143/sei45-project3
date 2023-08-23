const ContentModel = require("../models/Content");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");

const searchFunction = async (req, res) => {
  try {
    // store the search in a variable
    const searchString = req.body.searchString;
    // output of this searchFunction
    const searchResults = [];
    // split the string into individual words
    const searchArray = [];
    if (searchString) {
      searchArray.push(searchString.split(" "));
    }

    // search within ContentModel
    const searchContent = async () => {
      // find any form of substrings in the respective fields
      const query = {
        $or: searchArray.map((term) => ({
          $or: [
            { drinkName: { $regex: `${term}`, $options: "i" } },
            { shopName: { $regex: `${term}`, $options: "i" } },
            { contentReview: { $regex: `${term}`, $options: "i" } },
            { contentTag: { $regex: `${term}`, $options: "i" } },
          ],
        })),
      };
      const results = await ContentModel.find(query);
      // push results into output
      searchResults.push(...results);
    };

    // search in CommentModel
    const searchComment = async () => {
      const query = {
        $or: searchArray.map((term) => ({
          $or: [
            { comment: { $regex: `^${term}`, $options: "i" } },
            { comment: { $regex: `${term}$`, $options: "i" } },
          ],
        })),
      };
      const results = await CommentModel.find(query);
      searchResults.push(...results);
    };

    // search UserModel
    const searchUser = async () => {
      const query = {
        $or: searchArray.map((term) => ({
          $or: [
            { username: { $regex: `^${term}`, $options: "i" } },
            { username: { $regex: `${term}$`, $options: "i" } },
          ],
        })),
      };
      const results = await UserModel.find(query);
      searchResults.push(...results);
    };

    await Promise.all([searchContent(), searchComment(), searchUser()]);

    res.json(searchResults);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", msg: `Cannot find ${searchString}` });
  }
};

module.exports = searchFunction;
