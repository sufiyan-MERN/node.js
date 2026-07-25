const express = require("express");
const app = express();
app.use(express.json());

let todoArr = ["go to gym", "go to market"];

app.get("/todo", (request, response) => {
  // response.send("hello world")
  response.json({
    data: todoArr,
  });
});

app.post("/todo", (request, response) => {
  const newTodo = request.body.todo;    
  todoArr.push(newTodo);

  response.json({
    message: "todo received and added sucessfully",
  });
});

app.listen("8080", () => {
  console.log("server is running");
});
