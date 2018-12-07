const fs = require("fs");
const readline = require("readline");
const path = "6/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

let leftBound = Infinity;
let bottomBound = Infinity;
let rightBound = null;
let topBound = null;

let coords = [];

rl.on("line", line => {
  // Find bounds
  let coord = line.split(", ").map(Number);
  if (coord[0] > rightBound) rightBound = coord[0];
  if (coord[0] < leftBound) leftBound = coord[0];
  if (coord[1] > topBound) topBound = coord[1];
  if (coord[1] < bottomBound) bottomBound = coord[1];
  coords.push(coord);
}).on("close", () => {
  // make grid
  console.log(rightBound, leftBound, bottomBound, topBound);
  const grid = Array(topBound - bottomBound + 1).fill(
    Array(rightBound - leftBound + 1)
  );
  // place grid points
  for (let i = 0; i < coords.length; i++) {
    console.log(grid[coords[i][1] - bottomBound][coords[i][0] - leftBound]);

    grid[coords[i][1] - bottomBound][coords[i][0] - leftBound] = i;
  }
  //[coords[i][0] - leftBound]
  //   console.log(grid);
  // fill distances
  // find largest non-infinite area
});
