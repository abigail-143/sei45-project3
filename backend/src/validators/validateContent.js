const { body } = require("express-validator");

const validateAddContentData = [
  body("contentPhoto", "Photo is require").not().isEmpty(),
  body("drinkName", "Name of drink is require").not().isEmpty(),
  body("drinkName", "Only max of 30 characters").isLength({ max: 30 }),
  body("shopName", "Only max of 30 characters").isLength({ max: 30 }),
  body("contentReview", "Only max of 200 characters").isLength({ max: 200 }),
  body("contentTag", "Only max of 100 characters").isLength({ max: 100 }),
];

module.exports = { validateAddContentData };
