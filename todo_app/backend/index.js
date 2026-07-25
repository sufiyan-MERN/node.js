const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

let todoArr = ["go to market"];

app.get("/todo", (response, request) => {
  response.json({
    data: todoArr,
  });
});
app.post("/todo", (response, request) => {});
app.put("/todo", (response, request) => {});
app.delete("/todo", (response, request) => {});
