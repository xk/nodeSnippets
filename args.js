#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

//Muestra los argumentos con que se ha llamado a node (process.argv)

var sys = require('sys');

process.argv.forEach(function (val, index, array) {
  sys.puts(index + ': ' + val);
});