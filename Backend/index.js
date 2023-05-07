require("dotenv").config();
const express = require("express");
const CONNECT_DATABASE = require("./src/Database/Database.js");
const route = require("./src/Routes/Routes.js");
const app = express();

const PORT = 8080 || process.env.PORT;

app.route("/").get((req, res) => {
  res.json({ success: true, message: "Welcome To Backend Zone!" });
});
app.use(express.json());
app.use(route);

CONNECT_DATABASE(process.env.DATABASE_URI);
app.listen(PORT, () => {
  console.log(`your server is runing on port http://localhost:${PORT}`);
});
