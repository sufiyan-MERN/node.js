const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { readFile } = require("fs/promises");

const filePath = path.join(__dirname, "todo.json");

const printTodo = () => {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
};

const addTodo = (new_todo) => {
  const data = fs.readFileSync(filePath, "utf8");
  const todoArr = JSON.parse(data);

  todoArr.push(new_todo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");
  console.log("todo added sucessfully");
};

const updateTodo = (existing_todo, new_todo) => {
  const data = fs.readFileSync(filePath, "utf8 ");
  const todoArr = JSON.parse(data);
};

const deleteTodo = (todo_value) => {
  const data = fs.readFileSync(filePath, "utf8");
  const todoArr = JSON.parse(data);

  const filteredTodo = todoArr.filter((todo) => {
    if (todo.toLowerCase() == todo_value.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(filteredTodo), "utf8");
  console.log("todo deleted sucessfully");
};

program
  .name("Todo CLI")
  .description("CLI based persistent todo applicatioin")
  .version("1.0.0");

program
  .command("print")
  .description("Print all todos from the Todo list")
  .action(() => {
    printTodo();
  });

program
  .command("add")
  .description("add new todo to the Todo list")
  .argument("<new_todo>", "argument to get a new value from the user")
  .action((new_todo) => {
    printTodo(new_todo);
  });

program
  .command("delete")
  .description("delete an existing todo from the Todo list")
  .argument("<todo_value>", "argument to delete value from the todo list")
  .action((todo_value) => {
    printTodo(todo_value);
  });

program.parse();
