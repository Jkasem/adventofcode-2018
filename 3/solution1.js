const fs = require("fs");
const readline = require("readline");
const path = "3/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

const square = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

rl.on("line", line => {
  const input = line.split("@ ")[1].split(": ");
  const offset = input[0].split(",");
  const x = Number(offset[0]);
  const y = Number(offset[1]);
  const dimensions = input[1].split("x");
  const width = Number(dimensions[0]);
  const height = Number(dimensions[1]);

  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      square[i][j] += 1;
    }
  }
}).on("close", () => {
  let counter = 0;
  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square[i].length; j++) {
      if (square[i][j] > 1) {
        counter++;
      }
    }
  }
  console.log(counter);
});
