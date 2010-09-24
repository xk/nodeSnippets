if (!Number.prototype.times) {
  Object.defineProperty(Number.prototype, 'times', {
    enumerable: false,
    value: function times (f) {
      var times= +this;
      var n= 0;
      while (n < times) f(n++);
      return this;
    }
  });
}

/*
(5).times(function (i) {
  console.log(i);
});
->
0
1
2
3
4
*/

if (!Array.prototype.upto) {
  Object.defineProperty(Array.prototype, 'upto', {
    enumerable: false,
    value: function upto (f) {
      var start= +this[0];
      var end= +this[1];
      while (start <= end) f(start++);
    }
  });
}

/*
[-2,3].upto(function (i) {
  console.log(i);
});
->
-2
-1
0
1
2
3
*/

if (!Array.prototype.downto) {
  Object.defineProperty(Array.prototype, 'downto', {
    enumerable: false,
    value: function downto (f) {
      var start= +this[0];
      var end= +this[1];
      while (start >= end) f(start--);
    }
  });
}

/*
[2,-2].downto(function (i) {
  console.log(i);
});
->
2
1
0
-1
-2
*/