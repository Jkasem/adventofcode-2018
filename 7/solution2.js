const fs = require("fs");
const readline = require("readline");
const path = "7/input.txt";
const workers = 5;
const stepLength = 60;

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

class Node {
  constructor(current, previous, next) {
    this.current = current;
    this.previous = previous ? [previous] : [];
    this.next = next ? [next] : [];
  }

  addPrevious(value) {
    const newState = this.previous;
    newState.push(value);
    this.previous = newState;
  }

  addNext(value) {
    const newState = this.next;
    newState.push(value);
    this.next = newState;
  }
}

let nodes = {};

rl.on("line", line => {
  // Read input
  const steps = line.split(" must be finished before step ");
  const from = steps[0][steps[0].length - 1];
  const to = steps[1][0];

  // Build graph of nodes
  if (!nodes[from]) {
    nodes[from] = new Node(from);
  }
  if (!nodes[to]) {
    nodes[to] = new Node(to);
  }
  nodes[from].addNext(nodes[to]);
  nodes[to].addPrevious(nodes[from]);
}).on("close", () => {
  // hold queue'd nodes
  const queue = [];
  const completedNodes = new Set();

  // find root
  for (let node of Object.values(nodes)) {
    if (!node.previous.length) {
      queue.push(node);
    }
  }

  // function to find next node to work on
  const findNextNode = () => {
    let firstLetter = "z";
    let index = -1;

    // look through queue'd nodes to find first letter that has all previous completed
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].current < firstLetter) {
        let completed = true;
        for (let node of queue[i].previous) {
          if (!completedNodes.has(node.current)) completed = false;
        }
        if (completed) {
          index = i;
          firstLetter = queue[i].current;
        }
      }
    }
    // take it out of the queue
    let removed = [null];
    if (index > -1) removed = queue.splice(index, 1);

    return removed[0];
  };

  const startTick = () => {
    const workerTimes = Array(workers).fill([0, null]);

    // assign first task
    const node = findNextNode();
    if (node)
      workerTimes[0] = [node.current.charCodeAt(0) - 64 + stepLength, node];

    for (var i = 0; i < Infinity; i++) {
      // tick
      let finished = true;
      for (const [index, worker] of Object.entries(workerTimes)) {
        if (worker[1]) {
          finished = false;
          workerTimes[index][0]--;
        }
      }
      if (finished) break;

      // give worker tasks
      for (const [index, worker] of Object.entries(workerTimes)) {
        if (worker[0] === 0) {
          if (worker[1]) {
            completedNodes.add(worker[1].current);
            // queue up next nodes
            for (let node of worker[1].next) {
              if (!queue.includes(node) && !completedNodes.has(node.current)) {
                queue.push(node);
              }
            }
            workerTimes[index] = [0, null];
          }
          if (queue.length) {
            const node = findNextNode();
            // console.log(node);
            if (node)
              workerTimes[index] = [
                node.current.charCodeAt(0) - 64 + stepLength,
                node,
              ];
          }
        }
      }
    }
    console.log(`Total time: ${i - 1} seconds`);
  };
  startTick();
});
