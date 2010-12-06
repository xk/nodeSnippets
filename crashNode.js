var ctr= 0;
var t0= Date.now();
while (t0 === Date.now()) ; //get in sync with clock

(function dspCtr () {
  console.log(["#", ctr, " -> ", Date.now()-t0, "ms"].join(''));
  ctr= 0;
  process.nextTick(dspCtr);
})();

(function foo () {
  process.nextTick(foo);
  process.nextTick(foo);
  ctr+=2;
})();
