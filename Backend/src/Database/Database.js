const mongoose = require("mongoose");

const CONNECT_DATABASE = (URL) => {
  try {
    mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = CONNECT_DATABASE;
