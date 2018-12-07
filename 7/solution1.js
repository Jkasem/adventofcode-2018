const fs = require("fs");
const readline = require("readline");
const path = "7/input.txt";

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
  // keep track of order traversed
  let order = "";

  // hold queue'd nodes
  const queue = [];

  // find root
  for (let node of Object.values(nodes)) {
    if (!node.previous.length) {
      queue.push(node);
    }
  }

  const completedNodes = new Set();

  // work through queue'd nodes
  while (queue.length) {
    let firstLetter = "z";
    let index = 0;

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
    removed = queue.splice(index, 1);
    completedNodes.add(removed[0].current);
    order += removed[0].current;

    // queue up next nodes
    for (let node of removed[0].next) {
      if (!queue.includes(node) && !completedNodes.has(node.current)) {
        queue.push(node);
      }
    }
  }

  // finish
  console.log(order);
});
