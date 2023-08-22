const { body } = require("express-validator");

const validateAddCommentData = [
  body("comment", "Only max of 100 characters").isLength({ max: 100 }),
];

module.exports = { validateAddCommentData };
