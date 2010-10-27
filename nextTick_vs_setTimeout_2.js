/*
2010-08-27 jorge@jorgechamorro.com
Node.js
This program compares the rate of nextTick() vs that of setTimeout(,0)
*/

var waitUntil= +process.argv[2] || 1e3;
if (waitUntil < 0) waitUntil= 0;
console.log("WAIT FOR: "+ waitUntil+ "ms");
waitUntil+= +new Date();

function log (txt) {
  return function () { console.log(txt) };
}

setTimeout(log("timer"), 0);
process.nextTick(log("ticker"));

while (+new Date() < waitUntil) ;
