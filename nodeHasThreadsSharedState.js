// 2011-07-20 Fox Mulder, Dana Scully
// Prove that Node is multi-threaded and has shared mutable state.

var kLen= 1024;
var fs= require('fs');
var buffer= new Buffer(kLen);
var fd= fs.openSync('/dev/random', 'r');

var bad= 0;
var good= 0;
function yay () {
  console.log([++bad,good]+ ' Trust No One. The Truth Is Out There.');
}

(function read () {
  fs.read(fd, buffer, 0, kLen, null, read);
})();

(function compare () {
  var i= kLen;
  while (i--) if (buffer[i] !== buffer[i]) yay(); else ++good;
  process.nextTick(compare);
})();

