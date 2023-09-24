const { body } = require("express-validator");

const validateRegData = [
  body("username", "Username is invalid.").not().isEmpty().isLength({
    min: 5,
    max: 20,
  }),

  body("password", "Password is invalid.").not().isEmpty().isLength({
    min: 8,
    max: 20,
  }),
];

const validateLogin = [
  body("username", "Username is invalid.").not().isEmpty().isLength({
    min: 5,
    max: 20,
  }),
  body("password", "Password is invalid.").not().isEmpty().isLength({
    min: 8,
    max: 20,
  }),
];

const validateResetData = [
  body("password", "Password is invalid.").not().isEmpty().isLength({
    min: 8,
    max: 20,
  }),
];

module.exports = { validateLogin, validateRegData, validateResetData };
