const User = require("../Model/Model.js");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/uploadProfile.js");
const handleSignUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const isExist = await User.findOne({ email: email });

    // const emailExist = await User.isEmailInUser(email);
    if (isExist) {
      return res.json({
        success: false,
        message: "this email is Already exist please try to login",
      });
    }

    const user = await User({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    await user.save();
    res.json({ success: true, message: "signup Successfull" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error While Creating user" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.json({
        success: false,
        message: "user not found please signUp",
      });
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.json({
        success: false,
        message: "email / password does not match",
      });
    const token = await jwt.sign({ _Id: user._id }, process.env.SECRETE_KEY);
    // console.log({ ...user.tokens, token });
    let OldToken = user.tokens || [];
    if (!OldToken == []) {
      OldToken = OldToken.filter((t) => {
        // console.log(t);
        const TimeDuff = Date.now() - parseInt(t.signedAt) / 1000;

        if (TimeDuff < 86400) {
          return t;
        }
      });
    }

    // console.log({ ...OldToken, OldToken });

    await User.findByIdAndUpdate(user._id, {
      tokens: [...OldToken, { token, signedAt: Date.now().toString() }],
    });

    const userInfo = {
      email: user.email,
      password: user.password,
      // avatar: avatar ? user.avatar : "",
    };
    // user.generateAuthToken();
    res.status(200);
    res.json({ success: true, message: userInfo, token });
  } catch (error) {
    res.json({
      success: false,
      message: "server Error While Login Please try after some time",
    });
  }
};

// Handling Profile Pictur Upload
const uploadProfile = async (req, res) => {
  const { user } = req;
  // console.log("working");
  // console.log(user);
  if (!user)
    return res.json({
      success: false,
      message: "unauthorized access for uploading  Image",
    });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      height: 500,
      width: 500,
      Crop: "fill",
    });
    // console.log(result);

    const userFounded = await User.findByIdAndUpdate(user._id, {
      avatar: result.url,
    });

    res
      .status(201)
      .json({ success: true, message: "your profile picture has updated" });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `server error while uploading image ${error}`,
    });
  }
};

//   LogginOut User

handleLogout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }
    const tokens = req.user.tokens;
    const newToken = tokens.filter((t) => {
      t !== token;
    });
    await User.findByIdAndUpdate(req.user._id, { tokens: newToken });
    res.json({ success: true, message: "Logout Successfull" });
  }
};

// Profile Information Route

const handleProfile = (req, res) => {
  const { user } = req;
  try {
    if (req.headers && req.headers.authorization) {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "unAuthorized access" });
      }

      res
        .status(200)
        .json({ success: true, message: "Access Successfull", user: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, messsage: "Error in server" });
    console.log(error.message);
  }
};

module.exports = {
  handleLogin,
  handleSignUser,
  uploadProfile,
  handleLogout,
  handleProfile,
};
