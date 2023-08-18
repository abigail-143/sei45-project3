const { body } = require("express-validator");

const validateRegData = [
  body("username", "username is invalid").not().isEmpty().isLength({
    min: 5,
    max: 20,
  }),

  body("password", "input password").not().isEmpty().isLength({
    min: 8,
    max: 20,
  }),
];

const validateLogin = [
  body("username", "username is invalid").not().isEmpty().isLength({
    min: 5,
    max: 20,
  }),
  body("password", "input password").not().isEmpty().isLength({
    min: 8,
    max: 20,
  }),
];
module.exports = { validateLogin, validateRegData };
