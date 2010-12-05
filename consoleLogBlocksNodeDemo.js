var kLoop= 2;
function yield (ƒ) { process.nextTick(ƒ) }
function rnd (n) { return Math.floor(Math.random()*n) }

(function fiber (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    yield(loop);
  })();
})(1,0);

(function fiber (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    yield(loop);
  })();
})(2,0);
