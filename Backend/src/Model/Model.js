const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  avatar: String,
  Date: {
    type: Date,
    default: Date.now,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //     },
  //   },
  // ],
  tokens: [{ type: Object }],
});

// Checking email is Valid or  not

userSchema.statics.isEmailInUser = async function (Email) {
  try {
    const emailExist = User.findOne({ email: Email });
    if (emailExist) return true;
    return false;
  } catch (error) {
    console.log(`error in isEMailinUse Mthod ${error.message}`);
  }
};

// Hashing password with bcrypt 10 rounds

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});
// Hashing Confirm password with bcrypt 10 rounds

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.confirmPassword, 10, (err, hash) => {
      if (err) return next(err);
      this.confirmPassword = hash;
      next();
    });
  }
});

// Comparing Password with bcrypt

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("password is missing, Cannot not compare");
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Creating JSONWEBTOKEN for User Authorization

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     console.log("working");
//     const token = await JWT.sign({ _id: this._id }, process.env.SECRETE_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     console.log(token);
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
