/* ************************************** ALT-console
var console= {};
console.log= (function (txt) {
  var fs= require('fs');
  var fd= process.stdout.fd;
  var buf= [];
  var writeLock= 0;
  var saveData;
  
  function cb (err, written) {
    var prefix= '';
    if (err) {
      if (err= require('constants').EAGAIN) written= 0;
      else throw Error(err);
    }
    if (written < saveData.length) prefix= saveData.substr(written);
    if (prefix || buf.length) write(prefix+ buf.join('\n'));
    else writeLock= 0;
    buf.length= 0;
  }
  
  function writer (txt) {
    if (writeLock) buf.push(txt);
    else {
      writeLock= 1;
      saveData= txt+ "\n";
      write(saveData);
    }
  }
  
  function write (txt) {
    writeLock= 1;
    saveData= txt;
    fs.write(fd, txt, -1, "utf8", cb);
  }
  return writer;
})();

// *********************************************/

var kLoop= 2;
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

(function thread (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    next(loop);
  })();
})(3,0);

(function thread (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    next(loop);
  })();
})(4,0);

(function thread (n, i) {
  (function loop () {
    var x= rnd(kLoop);
    while (x--) console.log([n, ' -> ', i++].join(''));
    next(loop);
  })();
})(5,0);

