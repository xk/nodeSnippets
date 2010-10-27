/*
2010-08-27 jorge@jorgechamorro.com
Node.js
This program compares the rate of nextTick() vs that of nextTick() + some event pending
*/

var ms= +process.argv[2] || 0;
if (ms < 0) ms= 0;
console.log("USING: setTimeout(f, "+ms+")");

var nxttick= 0;
var listnrs= 0;
var seconds= 0;

function display () {
  setTimeout(display, 1e3);
  seconds++;
  var txt= "nextTick: "+ nxttick+ " ["+ toKHz(nxttick)+ " KHz]";
  txt+= ", listnrs: "+ listnrs+ " ["+ toKHz(listnrs)+ " KHz]";
  txt+= ", count(nextTick)- count(listnrs)= "+ (nxttick-listnrs);
  console.log(txt);
  function toKHz (count) { return (count/seconds/1e3).toFixed(2); }
}

setTimeout(display, 1e3);

(function ticker () {
  nxttick++
  process.nextTick(ticker);
  //setTimeout(ticker, 0);
})();
