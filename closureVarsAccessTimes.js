/*
closureVarsAccessTimes.js
2010-09-03 jorge@jorgechamorro.com
Node.js
Displays access time to closure vars.
*/

var kLoops= 1e6;
var kMul= 10;
var get= {};

(function(){return this})().ctxGlobal= "ctxGlobal";
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
  t = Date.now()- t;
  i= kLoops * kMul;
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

/*
Here's what some other JS engines were doing wrt this as of 2010-09-03:

$ node -v
v0.2.0
$ node closureVarsAccessTimes.js 
  102 ms   10.20 ns   98.04 Mhz   ctxGlobal
  192 ms   19.20 ns   52.08 Mhz        ctx9
  179 ms   17.90 ns   55.87 Mhz        ctx8
  186 ms   18.60 ns   53.76 Mhz        ctx7
  164 ms   16.40 ns   60.98 Mhz        ctx6
  126 ms   12.60 ns   79.37 Mhz        ctx5
  150 ms   15.00 ns   66.67 Mhz        ctx4
  104 ms   10.40 ns   96.15 Mhz        ctx3
   89 ms    8.90 ns  112.36 Mhz        ctx2
   75 ms    7.50 ns  133.33 Mhz        ctx1
   72 ms    7.20 ns  138.89 Mhz        ctx0

Safari 5.0.1
navigator.userAgent
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-us) AppleWebKit/534.7+ (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8"

 505 ms   50.50 ns   19.80 Mhz   ctxGlobal
 509 ms   50.90 ns   19.65 Mhz        ctx9
 140 ms   14.00 ns   71.43 Mhz        ctx8
 130 ms   13.00 ns   76.92 Mhz        ctx7
 128 ms   12.80 ns   78.13 Mhz        ctx6
 111 ms   11.10 ns   90.09 Mhz        ctx5
 106 ms   10.60 ns   94.34 Mhz        ctx4
 110 ms   11.00 ns   90.91 Mhz        ctx3
 106 ms   10.60 ns   94.34 Mhz        ctx2
 106 ms   10.60 ns   94.34 Mhz        ctx1
 110 ms   11.00 ns   90.91 Mhz        ctx0
 
Chrome 6
navigator.userAgent
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.53 Safari/534.3"

 5567 ms  556.70 ns    1.80 Mhz   ctxGlobal
 5798 ms  579.80 ns    1.72 Mhz        ctx9
 3904 ms  390.40 ns    2.56 Mhz        ctx8
 3006 ms  300.60 ns    3.33 Mhz        ctx7
 2513 ms  251.30 ns    3.98 Mhz        ctx6
 2182 ms  218.20 ns    4.58 Mhz        ctx5
 1928 ms  192.80 ns    5.19 Mhz        ctx4
 1551 ms  155.10 ns    6.45 Mhz        ctx3
 1312 ms  131.20 ns    7.62 Mhz        ctx2
 1011 ms  101.10 ns    9.89 Mhz        ctx1
  665 ms   66.50 ns   15.04 Mhz        ctx0
  
Opera
navigator.userAgent 
"Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.6.30 Version/10.61"

   82 ms    8.20 ns  121.95 Mhz   ctxGlobal
   63 ms    6.30 ns  158.73 Mhz        ctx9
  157 ms   15.70 ns   63.69 Mhz        ctx8
  138 ms   13.80 ns   72.46 Mhz        ctx7
   81 ms    8.10 ns  123.46 Mhz        ctx6
  112 ms   11.20 ns   89.29 Mhz        ctx5
  114 ms   11.40 ns   87.72 Mhz        ctx4
   81 ms    8.10 ns  123.46 Mhz        ctx3
  101 ms   10.10 ns   99.01 Mhz        ctx2
  129 ms   12.90 ns   77.52 Mhz        ctx1
   81 ms    8.10 ns  123.46 Mhz        ctx0

FireFox
navigator.userAgent
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.9) Gecko/20100824 Firefox/3.6.9"

13651 ms 1365.10 ns 0.73 Mhz ctxGlobal
5309 ms 530.90 ns 1.88 Mhz ctx9
3139 ms 313.90 ns 3.19 Mhz ctx8
3159 ms 315.90 ns 3.17 Mhz ctx7
3191 ms 319.10 ns 3.13 Mhz ctx6
3172 ms 317.20 ns 3.15 Mhz ctx5
3191 ms 319.10 ns 3.13 Mhz ctx4
3205 ms 320.50 ns 3.12 Mhz ctx3
3191 ms 319.10 ns 3.13 Mhz ctx2
3175 ms 317.50 ns 3.15 Mhz ctx1
3146 ms 314.60 ns 3.18 Mhz ctx0

*/