const fs = require("fs");
const readline = require("readline");
const path = "2/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

let twoCount = 0;
let threeCount = 0;

const checkCount = string => {
  const map = {};

  for (const letter of string) {
    if (!map[letter]) map[letter] = 1;
    else map[letter] += 1;
  }

  let two = false;
  let three = false;

  for (const count of Object.values(map)) {
    if (two && three) break;
    if (count === 2) two = true;
    if (count === 3) three = true;
  }

  if (two) twoCount++;
  if (three) threeCount++;
};

rl.on("line", line => {
  checkCount(line);
}).on("close", () => {
  console.log(twoCount * threeCount);
});
