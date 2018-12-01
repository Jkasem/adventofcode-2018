const fs = require("fs");
const readline = require("readline");

const path = "1/input.txt";

let counter = 0;
const hashmap = {};
let loop = true;

const startRead = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  rl.on("line", line => {
    counter += parseInt(line, 10);
    if (hashmap[counter]) {
      console.log(counter);
      loop = false;
      rl.close();
    } else {
      hashmap[counter] = 1;
    }
  }).on("close", () => {
    if (loop) startRead();
    else process.exit(1);
  });
};

startRead();
