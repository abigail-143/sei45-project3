const { body } = require("express-validator");

const validateAddContentData = [
  body("contentPhoto", "Photo is require").not().isEmpty(),
  body("drinkName", "Name of drink is require").not().isEmpty(),
  body("drinkName", "Only max of 30 characters").isLength({ max: 30 }),
];

module.exports = { validateAddContentData };
