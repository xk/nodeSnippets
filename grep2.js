//#/usr/bin/env node
//uso: node grep2.js fileName 'regExp'

require("child_process").exec(
  "cat "+ process.argv[2]+ " | grep '"+ process.argv[3]+ "' | wc -l",
  function (err, stdout, stderr) { require("sys").puts(stdout); }
);