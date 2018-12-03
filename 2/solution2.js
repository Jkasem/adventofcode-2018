const fs = require("fs");
const readline = require("readline");
const path = "2/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

let array = [];

const getDiffCount = (string1, string2) => {
  const maxlength =
    string1.length > string2.length ? string1.legnth : string2.length;
  const diffIndices = [];

  for (let i = 0; i < maxlength; i++) {
    if (string1[i] != string2[i]) diffIndices.push(i);
  }

  return diffIndices;
};

rl.on("line", line => {
  array.push(line);
}).on("close", () => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      const diffCount = getDiffCount(array[i], array[j]);
      if (diffCount.length === 1) {
        let output = array[i].split("");
        output.splice(diffCount[0], 1);
        console.log(output.join(""));
        return;
      }
    }
  }
});
