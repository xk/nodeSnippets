var ctr= 0;

var max= Math.pow(2,53);
var rnd= max* Math.random();
var distribution= [];
do {
  var newRnd= max* Math.random();
  if (newRnd !== Math.floor(newRnd)) console.log("***NOT INTEGER: "+ newRnd);
  var i= Math.floor(newRnd/max*5);
  if (!(++distribution[i])) distribution[i]= 1;
  ctr++;
} while (newRnd !== rnd);

distribution= distribution.map(function (i) { return (100*i/ctr).toFixed(1) });
console.log(ctr, distribution);