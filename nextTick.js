var sys= require("sys");

var kLoops= 3e5,
    i= kLoops;
    flipFlop= 1,
    now= +new Date(),
    then= now+ 20e3;

(function f () {
  if (--i) {
    flipFlop ? process.nextTick(f) : setTimeout(f, 0);
  } else {
    dsp(flipFlop);
    if (now < then) {
      flipFlop= !flipFlop;
      i= kLoops;
      now= +new Date();
      process.nextTick(f);
    } else {
      sys.puts("");
    }
  }
})();

function dsp (p) {
  sys.print((p ? "nextTick:   " : "setTimeout: ")
    + (kLoops/(+new Date()- now)/1e3).toFixed(3)
    + "MHz");
}
