/*
2010-08-27 jorge@jorgechamorro.com
Node.js
This program compares the rate of nextTick() vs that of nextTick() + some event pending
*/

console.log("process.argv.length: "+ process.argv.length);
process.argv.forEach(function (v,i,o) {
  console.log("argv["+ i+ "] --> "+ v);
});
