const jwt = require("jsonwebtoken");
const User = require("../Model/Model");

// Chcking JWT access for private Routes comming from front End

const Authrization = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    try {
      const token = req.headers.authorization;
      const decode = await jwt.verify(token, process.env.SECRETE_KEY);
      // console.log(decode._Id);
      const user = await User.findById({ _id: decode._Id });
      // console.log(user);
      if (!user) {
        return res.json({ success: false, message: "unauthorized access" });
      }
      //   res.json({ success: true, message: "Success" });
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "JsonWebTokenError") {
        return res.json({ success: false, message: "unauthorized access" });
      }
      if (error.name == "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired try signin",
        });
      }
      return res.json({ success: false, message: "Internal server error" });
    }
  } else {
    res.json({ success: false, message: "unauthorized access" });
  }
};

module.exports = Authrization;
