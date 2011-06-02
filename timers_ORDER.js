/*

To demostrate that node.js is the only JS platform that fires timers in an unpredictable order.

*/


var ctr= 0;
var RUN= 1;
var res= [];
var kMax= 1024;
var isaBrowser= !!(function(){return this})().window;

function run () {
  for (var ms=0; ms<kMax; ms++) setTimeout(f(ms),ms);
}

function f (ms) {
  return function () {
    if (RUN) {
      var pos= res.length;
      RUN= (pos === ms);
      var txt= ['#'+ (ctr++),pos,ms,RUN?'OK':'BAD'];
      isaBrowser? document.body.innerHTML= txt : console.log(txt);
      if (res.push(ms) >= kMax) {
        res.length= 0;
        run();
      }
    }
  };
}

run();

/*

To test a browser use this bookmarklet:

javascript:var ctr= 0;var RUN= 1;var res= [];var kMax= 1024;var isaBrowser= !!(function(){return this})().window;function run () { for (var ms=0; ms<kMax; ms++) setTimeout(f(ms),ms);}function f (ms) { return function () { if (RUN) { var pos= res.length; RUN= (pos === ms); var txt= ['#'+ (ctr++),pos,ms,RUN?'OK':'BAD']; isaBrowser? document.body.innerHTML= txt : console.log(txt); if (res.push(ms) >= kMax) { res.length= 0; run(); } } };}run();

*/

