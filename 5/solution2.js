const fs = require("fs");
const path = "5/input.txt";

fs.readFile(path, "utf8", (err, data) => {
  if (err) throw err;

  let shortest = Infinity;

  const reactPolymer = newData => {
    // let newData = data.slice().split("");
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

    return newData.length;
  };

  for (let i = 0; i < 26; i++) {
    const dataArray = data.split("");

    for (let j = 0; j < dataArray.length; j++) {
      if (
        65 + i === dataArray[j].charCodeAt(0) ||
        97 + i === dataArray[j].charCodeAt(0)
      ) {
        dataArray.splice(j, 1);
        if (j) j--;
      }
    }

    const finishedLength = reactPolymer(dataArray);
    if (finishedLength < shortest) shortest = finishedLength;
  }
  console.log(shortest);
});
