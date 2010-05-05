//#!/usr/bin/env node
//20100505 jorge@jorgechamorro.com

var global= Function("return this")();
var sys= (require && require("sys")) || {};
var puts= (global.console && console.log && (function (p) { console.log(p) })) || sys.puts || global.print || global.alert;
var inspect= sys.inspect || JSON.stringify;

var subClase= { foo: function () { return inspect(this); }};

var array= [1,2];
array.__proto__= subClase;
subClase.__proto__= Array.prototype;

array.push(3);
puts(array.foo());
puts("array.length:"+ array.length);
array[5]= 5;
puts("array.length:"+ array.length);
puts("array instanceof Array: "+ (array instanceof Array));
puts(array.foo());