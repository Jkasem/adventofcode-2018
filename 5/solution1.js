const fs = require("fs");
const path = "5/input.txt";

fs.readFile(path, "utf8", (err, data) => {
  if (err) throw err;

  let newData = data.slice().split("");
  let scannedToIndex = 0;

  const scanString = index => {
    for (let i = index; i < newData.length - 1; i++) {
      if (
        newData[i].charCodeAt(0) === newData[i + 1].charCodeAt(0) + 32 ||
        newData[i].charCodeAt(0) === newData[i + 1].charCodeAt(0) - 32
      ) {
        newData.splice(i, 2);
        if (scannedToIndex) scannedToIndex = i - 1;
        return;
      }
    }
    scannedToIndex = newData.length;
  };

  while (scannedToIndex < newData.length - 1) {
    scanString(scannedToIndex);
  }

  console.log("Remaining length:", newData.length);
});
