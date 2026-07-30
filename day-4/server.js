const express = require("express");
const app = express();
const restaurantsArr = require("./utlis/mockdata");
const cors = require("cors");

const addTimeStamps = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  //   console.log("time is", time);

  req.timeStamps = time;

  next();
};

const requestLoggerMiddleware = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  console.log("-----New Request-----");
  console.log("mehtod is: ", req.method);
  console.log("Route is: ", req.url);
  console.log("Time is: ", time);
  next();
};

let count = 0;
const requestCounter = (req, res, next) => {
  count++;
  console.log("current request count: ", count);
  next();
};

const rateLimiter = (req, res, next) => {
  if (count < 5) {
    next();
  } else {
    res.status(429).json({
      msg: "limite exceed",
    });
  }
};

const resNameMddleware = (req, res, next) => {
  console.log("Name of the restsurant: ");
  restaurantsArr.map((resname) => {
    console.log(resname.resName);
  });

  //   next();
};

app.use(express.json());
app.use(cors());
app.use(addTimeStamps);
app.use(requestLoggerMiddleware);
app.use(requestCounter);
app.use(rateLimiter);

app.get("/menu/:id", resNameMddleware, (req, res) => {
  const { id } = req.params;

  const targetMenu = restaurantsArr.filter((restaurant) => {
    return id === restaurant.id;
  });
  res.json({
    messageReceivedTime: req.timeStamps,
    data: targetMenu,
  });
});

app.get("/restaurant", (req, res) => {
  console.log(req.timeStamps);

  res.json({
    messageReceivedTime: req.timeStamps,
    data: ["mehfil", "pista house", "shah ghouse"],
  });
});

app.listen("8080", () => {
  console.log("server is listening at port 8080");
});
