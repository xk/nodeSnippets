var puts= require("sys").puts;
var rice_on_square = 1;
var n= 0;
do {
  puts("On square "+ (++n)+ " are "+ rice_on_square+ "grain(s)");
  rice_on_square *= 2;
} while(n < 64);