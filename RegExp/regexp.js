// regexpsimple.js
// jorge@jorgechamorro.com 2010-11-01

/* match: search for regexp anywhere in text */
function match (regexp, txt) {
  var txtPtr= 0, regexpPtr= 0;
  if (regexp[0] === '^') return matchhere(regexpPtr+1, txtPtr);
  do {  /* must look even if string is empty */
    if (matchhere(regexpPtr, txtPtr)) return 1;
  } while (txt[txtPtr++]);
  return 0;

  /* matchhere: search for regexp at beginning of text */
  function matchhere (regexpPtr, txtPtr) {
    if (!regexp[regexpPtr]                                                             ) return 1;
    if ( regexp[regexpPtr+1] === '*'                                                   ) return matchstar(regexp[regexpPtr], regexpPtr+2, txtPtr);
    if ( regexp[regexpPtr]   === '$' && !regexp[regexpPtr+1]                           ) return +!txt[txtPtr];
    if (txt[txtPtr] && (regexp[regexpPtr] === '.' || regexp[regexpPtr] === txt[txtPtr])) return matchhere(regexpPtr+1, txtPtr+1);
    return 0;
  }

  /* matchstar: search for c*regexp at beginning of text */
  function matchstar (c, regexpPtr, txtPtr) {
    do {  /* a * matches zero or more instances */
      if (matchhere(regexpPtr, txtPtr)) return 1;
    } while (txt[txtPtr] && (txt[txtPtr++] === c || c === '.'));
    return 0;
  }
}

function main (argc, argv) {
  if (argc < 4) {
    console.error("Error:: usage: "+ argv[1]+ " regexp text");
    return 1;
  }
  console.log(match(argv[2], argv[3]));
  return 0;
}

process.exit(main(process.argv.length, process.argv));
