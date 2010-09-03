/*
closureVarsAccessTimes.js
2010-09-03 jorge@jorgechamorro.com
Node.js
Displays access time to closure vars.
*/

var kLoops= 2e7;
var kMul= 10;
var get= {};

global.ctxGlobal= "ctxGlobal";
var ctx9= "ctx9";
(function () {
  var ctx8= "ctx8";
  (function () {
    var ctx7= "ctx7";
    (function () {
      var ctx6= "ctx6";
      (function () {
        var ctx5= "ctx5";
        (function () {
          var ctx4= "ctx4";
          (function () {
            var ctx3= "ctx3";
            (function () {
              var ctx2= "ctx2";
              (function () {
                var ctx1= "ctx1";
                (function () {
                  var ctx0= "ctx0";
                  get.ctx0= function () { return ctx0 };
                  get.ctx1= function () { return ctx1 };
                  get.ctx2= function () { return ctx2 };
                  get.ctx3= function () { return ctx3 };
                  get.ctx4= function () { return ctx4 };
                  get.ctx5= function () { return ctx5 };
                  get.ctx6= function () { return ctx6 };
                  get.ctx7= function () { return ctx7 };
                  get.ctx8= function () { return ctx8 };
                  get.ctx9= function () { return ctx9 };
                  get.ctxGlobal= function () { return ctxGlobal };
                })();
              })();
            })();
          })();
        })();
      })();
    })();
  })();
})();

function pad (s, l) {
  s+= "";
  while (s.length < l) s= " "+ s;
  return s;
}

function test (f) {
  var i = kLoops;
  var t = Date.now();
  while (i--) f(), f(), f(), f(), f(), f(), f(), f(), f(), f();
  var t = Date.now()- t;
  var i= kLoops * kMul;
  console.log( pad(t, 5) + " ms  " + pad((1e6*t/i).toFixed(2), 6)+ " ns"+ pad((i/t/1e3).toFixed(2), 8) + " Mhz"+ pad(f(), 12) );
}

test(get.ctxGlobal);
test(get.ctx9);
test(get.ctx8);
test(get.ctx7);
test(get.ctx6);
test(get.ctx5);
test(get.ctx4);
test(get.ctx3);
test(get.ctx2);
test(get.ctx1);
test(get.ctx0);
