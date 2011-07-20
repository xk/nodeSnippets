// 2011-07-20 Fox Mulder, Dana Scully
// Prove that Node is multi-threaded and has shared mutable state.

var kLen= 16384;
var fs= require('fs');
var buffer= new Buffer(kLen);
var fd= fs.openSync('/dev/random', 'r');

(function read () {
  fs.read(fd, buffer, 0, kLen, null, read);
})();

(function compare () {
  var i= kLen;
  while (i--) (buffer[i] !== buffer[i]) && yay();
  process.nextTick(compare);
})();

var ctr= 0;
function yay () {
  console.log(++ctr+ ' Trust No One. The Truth Is Out There.');
}

