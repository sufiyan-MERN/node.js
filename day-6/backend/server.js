const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "i love JWT";

let users = [];

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const newUserObj = {
    username,
    email,
    password,
  };
  users.push(newUserObj);
  console.log("current db status: ", users);

  res.json({
    msg: "user register sucessfully",
    data: newUserObj,
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find((userObj) => {
    if (userObj.email == email && userObj.password == password) {
      return true;
    }
  });
  console.log(foundUser);

  if (foundUser == undefined) {
    res.json({
      msg: "invalid credentials",
    });
  } else {
    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);
    res.json({
      msg: "login sucessfully",
      token: token,
    });
  }
});

app.get("/me", (req, res) => {
  const { token } = req.headers;
  console.log(token);

  const jwtPayload = jwt.verify(token, JWT_SECRET);

  if (jwtPayload) {
    res.json({
      msg: "your not allowed to access data",
    });
    // console.log(jwtPayload);

    const verifilediUserData = users.find((userObj) => {
      if (userObj.username === jwtPayload.username) {
        return true;
      }
    });
    res.json({
      msg: "your eligibal to get data",
      data: verifilediUserData,
    });
  }
});

app.listen("8080", () => {
  console.log("server is running at port: 8080");
});
