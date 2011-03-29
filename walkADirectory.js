// 2010-11-25 jorge@jorgechamorro.com
// Uses 2 threads

function walk (file, cb) {
  var fs = require('fs');
  var q= [];
  var queue= [q];
  walk2();
  
  function walk2 () { 
    cb(file);
    fs.lstat(file, function (err, stat) {
      if (!stat.isDirectory() || err) return next();
      getDirectory(function (files) {
        queue.push(q= files);
        next();
      });
    });
  }
  
  function next () {
    if (q.length) {
      file= q.pop();
      walk2();
    }
    else if (queue.length-= 1) {
      q= queue[queue.length-1];
      next();
    }
  }
  
  function getDirectory (cb) {
    fs.readdir(file, function(err, files) {
      if (err) throw Error(err);
      files.sort(sort);
      files.forEach(fullPath);
      cb(files);
    });
  }
  
  function fullPath (v,i,o) {
    o[i]= [file, '/', v].join('');
  }
  
  function sort (a,b) {
    a= a.toLowerCase();
    b= b.toLowerCase();
    return (a > b) ? -1 : (a < b) ? 1 : 0;
  }
}

// your callback here
var ctr= 0;
function callBack (file) { console.log( ["[", ++ctr, "] ", file].join('') ) };

process.argv.forEach(function(val, index, array) {
  if (index > 1) walk(val, callBack);
});
