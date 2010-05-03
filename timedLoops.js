
  var sys=require("sys");
  sys.puts(arguments.callee);

  function nextChunk() {
    n++;
  };

  var kt= 2e3;
  var n= 0;
  var timeToStop= +new Date()+ kt;
  do {
    nextChunk();
  } while (+new Date() < timeToStop);

  sys.puts((n/kt/1e3).toFixed(3)+"MHz, while() loop");

  n= 0;
  timeToStop= +new Date()+ kt;
  (function loop () {
    nextChunk();
    if (+new Date() < timeToStop) {
      process.nextTick(loop);
    } else {
      sys.puts((n/kt/1e3).toFixed(3)+"MHz, nextTick() loop");
      n= 0;
      timeToStop= +new Date()+ kt;
      loop2();
    }
  })();


  function loop2 () {
    nextChunk();
    if (+new Date() < timeToStop) {
      setTimeout(loop2, 0);
    } else {
      sys.puts((n/kt/1e3).toFixed(3)+"MHz, setTimeout( ,0) loop");
    }
  }