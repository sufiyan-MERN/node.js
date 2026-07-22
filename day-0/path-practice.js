const { dir } = require("console");
const path = require("path");

const htmlpath = path.join(__dirname, "index.html");
const csspath = path.join(__dirname, "main.css");
const jspath = path.join(__dirname, "idnex.js");

console.log("html: ", htmlpath);
console.log("css: ", csspath);
console.log("javascript: ", jspath);
