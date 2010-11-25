var fs= require("fs");
var fileName= "test.txt";

var ctr= 0;
(function loop () {
  
  fs.open(fileName+ctr, "w+", function(err, fd) {
    if (err) throw Error(err);
    else {
      ctr++;
      console.log([fd, ctr]);
    }
  });
  
  process.nextTick(loop);
})();
