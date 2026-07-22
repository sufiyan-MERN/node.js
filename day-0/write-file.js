const fs = require("fs");
const path = require("path");

const msg = "this is my first file created with node js";
const filepath = path.join(__dirname, "my-message.txt");
fs.writeFileSync(filepath, msg);

console.log("file created sucessfully");
