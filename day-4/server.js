const express = require("express");
const app = express();
const restaurantsArr = require("./utlis/mockdata");

const addTimeStamps = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  console.log("time is", time);

  req.timeStamps = time;

  next();
};

app.get("/menu/:id", addTimeStamps, (req, res) => {
  const { id } = req.params;

  const targetMenu = restaurantsArr.filter((restaurant) => {
    return id === restaurant.id;
  });
  res.json({
    messageReceivedTime: req.timeStamps,
    data: targetMenu,
  });
});

app.get("/restaurant", addTimeStamps, (req, res) => {
  console.log(req.timeStamps);

  res.json({
    messageReceivedTime: req.timeStamps,
    data: ["mehfil", "pista house", "shah ghouse"],
  });
});

app.listen("8080", () => {
  console.log("server is listening at port 8080");
});
