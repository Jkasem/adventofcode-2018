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

const recheck = [];

rl.on("line", line => {
  const input = line.split(" @ ");
  const id = input[0];
  const data = input[1].split(": ");
  const offset = data[0].split(",");
  const x = Number(offset[0]);
  const y = Number(offset[1]);
  const dimensions = data[1].split("x");
  const width = Number(dimensions[0]);
  const height = Number(dimensions[1]);

  let pure = true;

  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      square[i][j] += 1;
      if (square[i][j] > 1) pure = false;
    }
  }

  if (pure) recheck.push(line);
}).on("close", () => {
  for (let line of recheck) {
    const input = line.split(" @ ");
    const id = input[0];
    const data = input[1].split(": ");
    const offset = data[0].split(",");
    const x = Number(offset[0]);
    const y = Number(offset[1]);
    const dimensions = data[1].split("x");
    const width = Number(dimensions[0]);
    const height = Number(dimensions[1]);

    let pure = true;

    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        if (square[i][j] > 1) pure = false;
      }
    }

    if (pure) {
      console.log(id);
      return;
    }
  }
});
