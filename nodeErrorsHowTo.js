var inspect= require('sys').inspect;

function i () {
  throw Error('This is the error that we want to track');
}

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
  var stackTrace= Error('previousTrace').stack.split("\n");
  return function () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      e.previousStackTrace= stackTrace;
      throw e;
    }
  };
}

var n= 1e3;
(function f () { --n && f() })();

process.on('uncaughtException', function ƒ (err) {
  var previous= err.previousStackTrace;
  var stack= err.stack.split("\n");
  console.log('Caught exception:\n', inspect(stack,0,99,1,1), "\n", inspect(previous,0,99,1,1));
});

/*

Caught exception:
 [ 'Error: This is the error that we want to track'
, '    at Error (unknown source)'
, '    at Timer.i (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:27:9)'
, '    at Timer.callback (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:18:16)'
, '    at node.js:599:9'
] 
 [ 'Error: previousTrace'
, '    at Error (unknown source)'
, '    at wrap (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:14:19)'
, '    at g (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:7:20)'
, '    at f (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:8:8)'
, '    at e (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:9:6)'
, '    at d (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:10:4)'
, '    at Object.<anonymous> (/Users/jorge/JAVASCRIPT/nodeSnippets/nodeErrorsHowTo.js:11:2)'
, '    at Module._compile (node.js:315:23)'
, '    at Object..js (node.js:323:12)'
, '    at Module.load (node.js:250:25)'
]

*/