const express = require("express");
const { generateKey } = require("node:crypto");
const app = express();
app.use(express.json());

let users = [];

function authmiddleware(req, res, next) {
  const { token } = req.header;

  let foundUser = null;
  foundUser = users.find((user) => {
    if (user.token == token) {
      return true;
    }
  });

  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    res.json({
      msg: "not allowed to access protected data",
    });
  }
}

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let token = "";
  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
};

app.post("/singup", (req, res) => {
  const { username, email, password } = req.body;

  const userObj = {
    username,
    email,
    password,
  };
  users.push(userObj);
  console.log(users);

  res.status(200).json({
    msg: "user registered sucessfully",
  });
});

app.post("/singin", (req, res) => {
  const { email, password } = req.body;
  let foundUser = null;

  foundUser = users.find((user) => {
    if (user.email == email && user.password == password) {
      return true;
    }
  });

  if (foundUser) {
    const token = generateToken();
    foundUser.token = token;
    console.log("db check", users);
    res.json({
      mes: "login sucessfully",
      token: token,
    });
  } else {
    res.json({
      msg: "invalid email or password",
    });
  }
});

app.use(authmiddleware);

app.get("/me", (req, res) => {
  const foundUser = req.user;
  res.json({
    data: foundUser,    
  });
});

const PORT = "8080";
app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
