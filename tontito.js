var sys= require("sys");
var nxtCtr = 0;
var stoCtr= 0;
var RUN= 1;
var theProblem= 0;

//flip "theProblem" in 3 seconds
setTimeout(function () {
  sys.puts("nextTick      : "+ nxtCtr);
  sys.puts("setTimeout(,0): "+ stoCtr);
  theProblem= 1;
  //Reset the counters
  nxtCtr= stoCtr= 0;
  //STOP in 3 seconds
  setTimeout(function () {
    RUN= 0;
    sys.puts("nextTick      : "+ nxtCtr);
    sys.puts("setTimeout(,1): "+ stoCtr);
  }, 3e3);
}, 3e3);

//Count nextTicks
(function nextTickLoop () {
  nxtCtr++;
  if (RUN) {
    process.nextTick(nextTickLoop);
  }
})();

//Count setTimeouts
(function setTimeoutLoop () {
  stoCtr++;
  if (RUN) {
    setTimeout(setTimeoutLoop, theProblem);
  }
})();
