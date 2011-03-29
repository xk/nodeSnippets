#!/usr/bin/env node
/*
# 052-samedigits.rb
#   juanfc 2010-12-08
# http://projecteuler.net/index.php?section=problems&page=2
# 52.
# Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x,
# contain the same digits in some order.
*/

var t= Date.now()+2;
while (t > Date.now()) ;

function ordenar (x) {
  return x.toString().split('').sort(up).join('');
}

function up (a,b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

var x = 0;
var done= false;
var s;
do {
  x+= 1;
  s= ordenar(x);
  done= (s === ordenar(2*x)) && (s === ordenar(3*x)) && (s === ordenar(4*x)) && (s === ordenar(5*x)) && (s === ordenar(6*x));
} while (!done);

console.log([x,2*x,3*x,4*x,5*x,6*x,(Date.now()-t)+ "ms"]);

