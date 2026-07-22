// import fs from "fs";
// import path from "path";
const fs = require("fs");
const path = require("path");

console.log("hello world");
// console.log("iam using node.js");
// // console.log(fs);
// // console.log(global);
// console.log(process.argv);
// console.log("directory", __dirname);

// const location = path.join(__dirname, "read.txt");
// console.log(location);
// const data = fs.readFileSync(location, "utf-8");
// console.log(data);

const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const result = num1 + num2;
console.log(result);

const args=process.argv.slice(2)