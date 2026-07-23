const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "example.txt");
// console.log(filePath);

//read file

// fs.readFile(filePath, "utf8", (err, data) => {
//   console.log(data);
// });

// read file sync

// const data = fs.readFileSync(filePath, "utf8");
// console.log(data);

// write file

// fs.writeFile(filePath, "hello iam from writefile", (err) => {
//   console.log("data added");
// });

fs.writeFileSync(filePath, "hello india", "utf8");

const oldData = fs.readFileSync(filePath, "utf8");
const newData = oldData + " iam from UAE";
fs.writeFileSync(filePath, newData, "utf8");
console.log("data added sucessfully");
