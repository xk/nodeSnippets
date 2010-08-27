/*
2010-08-27 jorge@jorgechamorro.com
Node.js
This program compares the rate of nextTick() vs that of setTimeout(,0)
*/

var nxttick= 0;
var timeout= 0;
var seconds= 0;

function display () {
  setTimeout(display, 1e3);
  seconds++;
  var txt= "nextTick: "+ nxttick+ " ["+ toKHz(nxttick)+ " KHz]";
  txt+= ", setTimeout: "+ timeout+ " ["+ toKHz(timeout)+ " KHz]";
  txt+= ", count(nextTick)- count(setTimeout)= "+ (nxttick-timeout);
  console.log(txt);
  function toKHz (count) { return (count/seconds/1e3).toFixed(2); }
};

setTimeout(display, 1e3);

(function ticker () {
  nxttick++
  process.nextTick(ticker);
})();


(function timer () {
  timeout++;
  setTimeout(timer, 0);
})();