/*

To demostrate that node.js is the only JS platform that fires timers in an unpredictable order.

*/


var RUN= 1;
var ctr= 0;
var setCtr= 0;
var k1= 1024;
var k2= 10;
var isaBrowser= !!(function(){return this}().window);

function set () {
  var timers= [];
  for (var i=0; i<(k1*k2); i++) {
    timers.push({t:Math.floor(Math.random()*kMax)});
  }
}

function f (order) {
  return function () {
    if (RUN) {
      RUN= (order === ctr);
      puts(['#'+ctr,order,RUN?'OK':'BAD']);
      !(++ctr % (kMax * kInnerLoops)) && setTimeout(set, 0);
    }
  };
}

function puts (txt) {
  if (isaBrowser) {
    document.body.innerHTML= txt;
  }
  else {
    process.stdout.write(new Buffer(txt+ '\n'));
  }
}


run();

/*

To test a browser use this bookmarklet:

javascript:var ctr= 0;var RUN= 1;var kMax= 1024;var isaBrowser= !!(function(){return this})().window;function run () { for (var ms=0; ms<kMax; ms++) setTimeout(f(ms),ms);}function f (ms) { return function () { if (RUN) { RUN= (ms === (ctr % kMax)); var txt= ['#'+ctr,ms,RUN?'OK':'BAD']; isaBrowser? document.body.innerHTML= txt : console.log(txt); !(++ctr%kMax) && run(); } };}run();

*/

