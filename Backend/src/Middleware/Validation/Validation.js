const { check, validationResult } = require("express-validator");

const UserValidation = [
  check("name")
    .trim()
    .not()
    .isEmail()
    .isLength({ min: 3, max: 15 })
    .withMessage("name must be with in 3 to 20 character"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
  check("password")
    .trim()
    .not()
    .isEmail()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password lenght must be with in 8 to 20 character"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("Both password must be same");
      }
      return true;
    }),
];

const UserValidationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.json({ success: false, message: error });
};

const userSignInValidation = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("email / password is required"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email / password is required"),
];

module.exports = {
  UserValidation,
  userSignInValidation,
  UserValidationResult,
};
