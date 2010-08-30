var max, min, count, lastTime, ms, timer, startTime;
var kTestDuration= 1e3;
var timeOuts= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
var intervals= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

function pad (string, len) {
  string+= "";
  while (string.length < len) {
    string= " "+ string;
  }
  return string;
}

function testTimeout () {
  timer= setTimeout(testTimeout, ms);
  var elapsed, elapsedT, currentTime= Date.now();
  if (lastTime) {
    elapsed= currentTime - lastTime;
    if (max < elapsed) max= elapsed;
    if (min > elapsed) min= elapsed;
  }  
  lastTime= currentTime;
  count++;
  if ((elapsedT= currentTime - startTime) > kTestDuration) {
    clearTimeout(timer);
    var txt= pad("setTimeout", 11)+ pad(ms, 3)+ "ms"+ pad((count/elapsedT).toFixed(2), 8)+ " KHz";
    txt+= pad(max, 4)+ " ms(max)"+ pad(min, 4)+ " ms(min)"+ pad((elapsedT/count).toFixed(4), 9)+ " ms(average)";
    console.log(txt);
    next();
  }
}

function testInterval () {
  var elapsed, elapsedT, currentTime= Date.now();
  if (lastTime) {
    elapsed= currentTime - lastTime;
    if (max < elapsed) max= elapsed;
    if (min > elapsed) min= elapsed;
  }  
  lastTime= currentTime;
  count++;
  if ((elapsedT= currentTime - startTime) > kTestDuration) {
    clearInterval(timer);
    var txt= pad("setInterval", 11)+ pad(ms, 3)+ "ms"+ pad((count/elapsedT).toFixed(2), 8)+ " KHz";
    txt+= pad(max, 4)+ " ms(max)"+ pad(min, 4)+ " ms(min)"+ pad((elapsedT/count).toFixed(4), 9)+ " ms(average)";
    console.log(txt);
    next();
  }
}

function next () {
  max= -1e6;
  min= 1e6;
  count= 0;
  lastTime= 0;
  if (timeOuts.length) {
    ms= timeOuts.shift();
    timer= setTimeout(testTimeout, ms);
    startTime= Date.now();
  } else if (intervals.length) {
    ms= intervals.shift();
    timer= setInterval(testInterval, ms);
    startTime= Date.now();
  }
}

next();

