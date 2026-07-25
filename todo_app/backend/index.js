const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

let todoArr = ["go to market"];

function updateTodo(oldTodo, newTodo) {
  let index;
  let filteredArr = todoArr.filter((todo, index) => {
    if (todo === oldTodo) {
      index = index;
      return false;
    } else {
      return true;
    }
  });
  filteredArr.splice(index, 0, newTodo);
  todoArr = filteredArr;
}

app.get("/todo", (response, request) => {
  response.json({
    data: todoArr,
  });
});
app.post("/todo", (response, request) => {
  console.log("post request received on /todo path");
  const { todo } = request.body;

  todoArr.push(todo);
  console.log(todoArr);

  response.json({
    message: "todo added sucessfully",
  });
});

app.put("/todo", (response, request) => {
  const { oldTodo, newTodo } = request.body;

  updateTodo(oldTodo, newTodo);

  response.json({
    message: "todo updated sucessfully   ",
  });
});
app.delete("/todo", (response, request) => {
  const { todo } = request.body;
  todoArr = todoArr.filter((element) => {
    if (element === todo) {
      return false;
    } else {
      return true;
    }
  });

  response.json({
    message: "todo deleted sucessfully",
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("server running at port: ", PORT);
});
