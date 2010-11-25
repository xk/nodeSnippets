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
        getDirectory(function (files) {
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
  
  function getDirectory (cb) {
    fs.readdir(file, function(err, files) {
      if (err) throw Error(err);
      files.sort(up);
      files.forEach(function (v,i,o) {
        o[i]= [file, '/', v].join('');
      });
      cb(files);
    });
  }
  
  function up (a,b) {
    if (a > b) return  1;
    if (a < b) return -1;
    else       return  0;
  }
}

// your callback here
var ctr= 0;
function callBack (file) { console.log( ["[", ++ctr, "] ", file].join('') ) };

process.argv.forEach(function(val, index, array) {
  if (index > 1) walk(val, callBack);
});
