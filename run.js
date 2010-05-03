#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

var path = require("path");
libDir = path.join(path.dirname(__filename), "../lib");
require.paths.unshift(libDir);
process.mixin(require("sys"));
var benchmarks = [ "callee.js" ];

var benchmark_dir = path.dirname(__filename);

process.ARGV.forEach(function (value, index, object) {
  puts("ARGV["+ index+ "]: "+ value);
});

var n= +process.ARGV[2] || 1;
n= n > 0 ? n : 1;
var m= n;
var hayError= 0;
var now= +new Date();

while (n-- && !hayError) {
  benchmarks.forEach(function (benchmark) {
    if (!hayError) {
      var start = new Date();
      try {
        //var child = process.createChildProcess(process.ARGV[0], [path.join(benchmark_dir, benchmark)]);
        var child = process.createChildProcess(process.ARGV[0], [path.join(benchmark_dir, benchmark)]);
        child.addListener("output", function (data) {
          data && puts(data);
        });
        child.addListener("exit", function (code) {
          puts(benchmark+": "+ (+new Date()- start)+ "ms, code:"+(code !== 0 ? "ERROR" : "")+ code);
        });
      } catch (error) {
        puts(error);
        hayError= 1;
      }
    }
  });
}

puts("Spawned "+ (+m- n- 1)+ " procesos en "+ (+new Date()- now)+ "ms");