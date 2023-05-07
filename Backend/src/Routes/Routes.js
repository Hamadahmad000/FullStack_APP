const express = require("express");
const route = express.Router();
const {
  handleLogin,
  handleSignUser,
  uploadProfile,
  handleLogout,
  handleProfile,
} = require("../controllers/userController.js");
const {
  UserValidation,
  UserValidationResult,
  userSignInValidation,
} = require("../Middleware/Validation/Validation.js");
const Authrization = require("../Middleware/Authorization.js");
const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

route.post("/signup", UserValidation, UserValidationResult, handleSignUser);

route.post("/login", userSignInValidation, UserValidationResult, handleLogin);

route.post(
  "/upload-image",
  Authrization,
  uploads.single("profile"),
  uploadProfile
);

route.post("/logout", Authrization, handleLogout);

route.get("/profile", Authrization, handleProfile);

module.exports = route;
