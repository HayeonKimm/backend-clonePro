const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const passport = require("passport");
const passportConfig = require("./passport");
require("dotenv").config();
passportConfig();
const session = require("express-session");
const User = require("./schemas/users");
const usersRouter = require("./routes/users");
const boardsRouter = require("./routes/boards");
const authRouter = require("./routes/auth");

mongoose.connect("mongodb://localhost/hanghae99_week4HW", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.use(cors());
app.use(express.json());

//session 설정
app.use(session({
  secret: 'practice',
  secure: false,
  resave: true,
  saveUninitialized: true,
}));
app.use("/api", [usersRouter, boardsRouter]);
app.use("/auth", authRouter);

app.listen(8080, () => {
  console.log("서버가 켜졌어어요.");
});

module.exports = app;