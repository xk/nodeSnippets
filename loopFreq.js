// 2010-12-16 jorge@jorgechamorro.com
// loopFreq.js displays event loop tick period in ms and KHz

var k_ms= 1e3;
setTimeout(function display () {
  t= Date.now()-t;
  console.log(["ctr: ",ctr, ", t:", t, "ms -> ", (ctr/t).toFixed(2), "KHz"].join(''));
  
  setTimeout(display, k_ms);
  
  ctr= 0;
  t= Date.now()+ 2;
  while (t > Date.now()) ; //get in sync with clock
}, k_ms);

var ctr= 0;
var t= Date.now()+ 2;
while (t > Date.now()) ; //get in sync with clock

(function foo () {
  //debugger;
  process.nextTick(foo);
  ctr++;
})();
