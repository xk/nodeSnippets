
var console= {};
console.log= (function (txt) {
  var fs= require('fs');
  var fd= process.stdout.fd;
  function NOP () {}
  return function (txt) {
    txt+= "\n";
    fs.write(fd, txt, -1, "utf8", NOP);
    txt= null;
  }
})();

var kLoop= 99;
function next (ƒ) { process.nextTick(ƒ) }
function rnd (n) { return Math.floor(Math.random()*n) }

(function thread (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    next(loop);
  })();
})(1,0);

(function thread (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    next(loop);
  })();
})(2,0);

