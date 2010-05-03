var sys= require("sys");
var puts= sys.puts;

var hash= {1:1};
function factorial (n, r) {
  if (n > 1) {
    if (!(r= hash[n])) {
      r= hash[n]= n* factorial(n-1);
    }
  } else r= 1;
  return r;
}

//Está vacío
puts(sys.inspect(hash));

//Lo llena hasta 4
puts(factorial(4));
puts(sys.inspect(hash));

//Lo llena hasta 16
puts(factorial(16));
puts(sys.inspect(hash));
