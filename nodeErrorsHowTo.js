var inspect= require('sys').inspect;

(function d () {
  (function e () {
    (function f () {
      (function g () {
        setTimeout(wrap(i), 10);
      })();
    })();
  })();  
})();

function wrap (f) {
  var stackTrace= Error('previousTrace');
  Error.captureStackTrace(stackTrace, wrap);
  stackTrace= stackTrace.stack.split("\n");
  
  return function () {
    try {
      var res= f();
    } catch (e) {
      e.previousStackTrace= stackTrace;
      throw e;
    }
    return res;
  };
}

function i () {
  throw Error('This is the error that we want to track');
}

process.on('uncaughtException', function ƒ (err) {
  var previous= err.previousStackTrace;
  Error.captureStackTrace(err, ƒ);
  var stack= err.stack.split("\n");
  console.log('Caught exception:\n', inspect(stack,0,99,1,1), "\n", inspect(previous,0,99,1,1));
});

/*

Caught exception:
 [ 'Error: This is the error that we want to track'
, '    at EventEmitter.emit (events:41:20)'
, '    at node.js:599:9'
] 
 [ 'Error: previousTrace'
, '    at g (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:7:20)'
, '    at f (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:8:8)'
, '    at e (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:9:6)'
, '    at d (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:10:4)'
, '    at Object.<anonymous> (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:11:2)'
, '    at Module._compile (node.js:315:23)'
, '    at Object..js (node.js:323:12)'
, '    at Module.load (node.js:250:25)'
, '    at Object.runMain (node.js:337:24)'
, '    at Array.0 (node.js:587:12)'
]

*/