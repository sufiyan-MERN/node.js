const fs = require("fs");
const path = require("path");
const program = require("commander");

// const filePath = path.join(__dirname, "example.txt");

const filePath = process.argv[2];

const data = fs.readFileSync(filePath, "utf8");

function letterCount() {
  console.log("the number of letters in this file are : ", data.length);
}
// letterCount();

function lineCount() {
  const lineCount = data.split("/n").length;
  console.log("the number of lines in this file: ", lineCount);
}
lineCount();

function wordCount() {
  const wordCount = data.split(" ").length;
  console.log("the number of words in this file: ", wordCount);
}
wordCount();

program
  .name("word CLI")
  .description(
    "CLI based file analyzer to count letters, lines and words of a given file ",
  )
  .version("1.0.0");

program
  .command("letter")
  .description("To count the number of letter in the given file")
  .argument("file_path", "Argument to take file path as command input")
  .action("<file_path<", () => {
    letterCount(file_path);
  });
