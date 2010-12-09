#!/usr/bin/env node
/*
# 052-samedigits.rb
#   juanfc 2010-12-08
# http://projecteuler.net/index.php?section=problems&page=2
# 52.
# Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x,
# contain the same digits in some order.
*/

Number.prototype.ordenar = function () {
  return this.toString().split('').sort(up).join('');
};

function up (a,b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

var x = 0;
var done= false;
var s;
do {
  x+= 1;
  s= x.ordenar();
  done= (s === (2*x).ordenar()) && (s === (3*x).ordenar()) && (s === (4*x).ordenar()) && (s === (5*x).ordenar()) && (s === (6*x).ordenar());
} while (!done);

console.log([x,2*x,3*x,4*x,5*x,6*x]);