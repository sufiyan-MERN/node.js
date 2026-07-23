import chalk from "chalk";
import figlet from "figlet";

console.log(chalk.blue("Hello world!"));

async function doStuff() {
  const text = await figlet.text("hello figlet");
  console.log(text);
}

// doStuff();

async function styledFiglet() {
  const text = await figlet.textSync("Hello, Hi!", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  console.log(text);
}

styledFiglet();
