const fs = require("fs");
const readline = require("readline");
const path = "1/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

let counter = 0;

rl.on("line", line => {
  counter += parseInt(line, 10);
}).on("close", () => {
  console.log(counter);
});
