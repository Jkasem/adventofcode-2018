const fs = require("fs");
const readline = require("readline");
const path = "4/input.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity,
});

let data = [];

let scheduleMap = {};

rl.on("line", line => {
  data.push(line);
}).on("close", () => {
  data.sort((a, b) => {
    if (a > b) return 1;
    else return -1;
  });

  let currentGuard = null;
  let currentSleep = null;

  for (let i = 0; i < data.length; i++) {
    const line = data[i].split(" ");
    if (line[2] === "Guard") {
      currentGuard = line[3].slice(1);
      if (!scheduleMap[currentGuard])
        scheduleMap[currentGuard] = Array(60).fill(0);
    } else {
      if (line[2] === "falls") currentSleep = Number(line[1].slice(3, -1));
      else if (line[2] === "wakes") {
        for (let j = currentSleep; j < Number(line[1].slice(3, -1)); j++) {
          scheduleMap[currentGuard][j]++;
        }
      }
    }
  }

  let sleepiestMinute = null;
  let sleepiestMinuteIndex = null;
  let sleepiestGuard = null;

  for (const [guard, times] of Object.entries(scheduleMap)) {
    for (let i = 0; i < times.length; i++) {
      if (times[i] > sleepiestMinute) {
        sleepiestMinute = times[i];
        sleepiestMinuteIndex = i;
        sleepiestGuard = guard;
      }
    }
  }

  console.log(
    `Sleepiest minute: ${sleepiestMinuteIndex}\nSleepiest guard: ${sleepiestGuard}\nTotal: ${sleepiestGuard *
      sleepiestMinuteIndex}\n`
  );
});
