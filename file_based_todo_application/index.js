const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.json());

const filePath = path.join(__dirname, "todo.json");
const file = fs.readFileSync(filePath, "utf8");

const todoArr = JSON.parse(file);
console.log(todoArr);

function updateToto(oldToto,newToto){
  let index
const filteredArray=todoArr.filter((todo,index)=>{
if(todo===oldToto){
  index=index
  return false
} else{
  return true
}

})
 filteredArray.splice(index, 0, newTodo);

 fs.writeFileSync(filePath,JSON.stringify(filteredArray),"utf8")
 console.log("todo updated sucessfully");
 
}

app.get("/todo", (req, res) => {
  res.json({
    data: todoArr,
  });
});

app.post("/todo", (req, res) => {
  const { todo } = req.body;
  todoArr.push(todo);
  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");
  console.log("todo added to the file", todoArr);
  res.json({
    message: "todo added sucessfully",
  });
});

app.put("/todo",(req,res)=>{
  const {oldToto,newToto}=req.body
  res.json({
    message:"todo updated sucessfully"
  })
})

app.listen("8080", () => {
  console.log("server is running");
});
