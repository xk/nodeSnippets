// 2011-11-25 jorge@jorgechamorro.com

function walk (file, cb) {
  var fs = require('fs');
  var queue= [];
  walk2();
  
  function walk2 () { 
    cb(file);
    fs.lstat(file, function (err, stat) {
      if (err) throw Error(err);
      if (stat.isDirectory()) {
        getDirectory(file, function (files) {
          queue= files.concat(queue);
          next();
        });
      }
      else next();
    });
  }
  
  function next () {
    if (queue.length) {
      file= queue.shift();
      process.nextTick(walk2);
    }
  }
  
  function getDirectory (file, cb) {
    fs.readdir(file, function(err, files) {
      if (err) throw Error(err);
      files.sort(function (a,b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
      files.forEach(function (v,i,o) {
        o[i]= [file, '/', v].join('');
      });
      cb(files);
    });
  }
}

// your callback here
var ctr= 0;
function callBack (file) { console.log( ["[", ++ctr, "] ", file].join('') ) };

process.argv.forEach(function(val, index, array) {
  if (index > 1) walk(val, callBack);
});
