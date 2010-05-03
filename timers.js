#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

var sys= require("sys");

sys.puts("PID: "+ process.pid+ " (timers.js): IN");

function next (i) {
  if (i <= 0) return;
  setTimeout(function () {
    next(i-1);
  }, 1);
}
next(500);

sys.puts("PID: "+ process.pid+ " (timers.js): OUT");