// print process.argv
var sys = require('sys');

process.argv.forEach(function (val, index, array) {
  sys.puts(index + ': ' + val);
});