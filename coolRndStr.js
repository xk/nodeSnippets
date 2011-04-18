Number.MAX_INT= Math.pow(2,53);

(function loop () {

  var txt= (Number.MAX_INT * Math.random()).toString(36);
  if (txt.indexOf('.') < 0) process.nextTick(loop);
  console.log(txt);
  
})();
