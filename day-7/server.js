const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserModel, TodoModel } = require("./utils/database");
const authMiddleWare = require("./Middleware/authMiddleware");

const app = express();

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
console.log("database url", databaseUrl);

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL in environment variables");
}

app.use(express.json());

mongoose.connect(databaseUrl);

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const feedback = await UserModel.create({
    username,
    email,
    password,
  });

  res.json({
    msg: "user registered successfully",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.find({
    email: email,
    password: password,
  });
  if (foundUser != undefined) {
    const token = jwt.sign(
      { id: foundUser[0]._id.toString() },
      process.env.JWT_SECRET,
    );

    res.json({
      msg: "login successfull",
      token: token,
    });
  } else {
    res.json({
      msg: "invalid credentials",
    });
  }
});

app.get("/test", (req, res) => {
  res.json({
    msg: "postman testing",
  });
});

app.use(authMiddleWare);

app.get("/me", async (req, res) => {
  const userId = req.userId;

  const data = await UserModel.find({ _id: userId });
  console.log(data);
  res.json({ data });
});

app.get("/todo", async (req, res) => {
  const userId = req.userId;
  const data = await TodoModel.find({
    userId,
  });

  res.json({
    data,
    msg: "get request received",
  });
});

app.post("/todo", async (req, res) => {
  const { title, description, isDone } = req.body;
  const feedback = await TodoModel.create({
    title: title,
    description,
    isDone,
    userId: req.userId,
  });

  res.json({
    msg: "toto added successfully",
    feedback,
  });
});

app.put("/todo", async (req, res) => {
  userId = req.userId;
  const { titile, description, isDone } = req.body;
  const feedback = await TodoModel.findOneAndReplace(
    {
      title: title,
      userId: userId,
    },
    { title, description, isDone, userId },
    { new: true },
  );
  res.json({
    msg: "todo updated successfully",
    feedback,
  });
});

app.delete("/todo", async (req, res) => {
  const userId = req.userId;
  const title = req.query.title;
  const feedback = await TodoModel.findOneAndDelete({ title, userId });

  res.json({
    msg: "todo deeleted successfully",
    feedback,
  });
});

app.listen("8080", () => {
  console.log("server is listening at port 8080");
});
