setTimeout(function () {
  t= Date.now()-t;
  STOP= 1;
  console.log([ctr, "/", t, "ms -> ", (ctr/t).toFixed(2), "KHz"].join(''));
}, 2e3);

function foo () {
  if (STOP) return;
  process.nextTick(foo);
  ctr++;
}

var ctr= 0;
var STOP= 0;
var t= Date.now()+ 2;
while (t > Date.now()) ; //get in sync with clock

foo();