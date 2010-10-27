function pad (n, len) {
  n+= "";
  while (n.length < len) n= " "+ n;
  return n;
}

function buscaPrimos (end) {
  var primos= [2];
  var len= (""+ end).length;
  var len2= (""+Math.floor(Math.sqrt(end))).length+ 6;
  var ctr= 0;
  
  (function loop (n) {
    var refresh= 3e7;
    
    do {
      var i= 0;
      var esPrimo= true;
      var next= primos[i];
      
      do {
        refresh--;
        if ( !(n % next) ) {
          esPrimo= false;
          break;
        }
        next= primos[++i];
      } while (next && (next <= n/next));

      if (esPrimo) {
        primos.push(n);
        //console.log(pad (n,len)+ /*pad([primos[--i],i], len2)+*/ pad(primos.length, 9));
      }
      //else console.log(pad (n,len)+ pad(i, len2));
      if (refresh < 0) {
        return setTimeout(function () {
          console.log("done: "+n+", remaining: "+(end-n)+", found: "+primos.length);
          loop(++n);
        }, 0);
      }

    } while (++n <= end);
    console.log([primos[primos.length-1], primos.length]);
  })(2);
}

buscaPrimos(+process.argv[2]);