Buffer.prototype.toStr= (function () {
  
  if (!Number.prototype.times) {
    Object.defineProperty(Number.prototype, 'times', {
      enumerable: false,
      value: function times (f) {
        var times= +this;
        var n= 0;
        while (n < times) f(n++);
        return this;
      }
    });
  }
  
  if (!Array.prototype.upto) {
    Object.defineProperty(Array.prototype, 'upto', {
      enumerable: false,
      value: function upto (f) {
        var start= +this[0];
        var end= +this[1];
        while (start <= end) f(start++);
      }
    });
  }
  
  if (!Array.prototype.downto) {
    Object.defineProperty(Array.prototype, 'downto', {
      enumerable: false,
      value: function downto (f) {
        var start= +this[0];
        var end= +this[1];
        while (start >= end) f(start--);
      }
    });
  }
  
  function toStr (encoding, start, end) {
    var r;
    
    try {
      r= this.toString(encoding, start, end);
      return r;
    } catch (e) { }
    
    if (typeof start === 'undefined') {
      start= 0;
    }
    else {
      start= +start;
      if (start < 0) start= 0;
    }
    
    if (typeof end === 'undefined') {
      end= this.length;
    }
    else {
      end= +end;
      if (end > this.length) end= this.length;
    }
    
    r= "";
    var table= toStr[(''+ encoding).toLowerCase()];
    if (!table) throw Error("Unknown encoding");
    while (start < end) {
      r+= table[this[start++]];
    }
    return r;
  }
  
  toStr["iso8859-1"]= (function () {
    //http://en.wikipedia.org/wiki/ISO-8859-1#Codepage_layout
    var t= [];
    var t= [];
    [0, 255].upto(function (i) {
      var hex= i < 16 ? '0'+ (i).toString(16) : (i).toString(16);
      //console.log([i,hex]);
      t[i]= eval('"\\x'+ hex+ '"');
    });
    return t;
  })();
  
  toStr["windows-1252"]= (function () {
    //http://en.wikipedia.org/wiki/Windows-1252#Codepage_layout
    var t= [];
    [255, 0].downto(function (i) {
      var hex= i < 16 ? '0'+ (i).toString(16) : (i).toString(16);
      t[i]= eval('"\\x'+ hex+ '"');
    });
    
    t[128]= "\u20ac";
    t[130]= "\u201a";
    t[131]= "\u0192";
    t[132]= "\u201e";
    t[133]= "\u2026";
    t[134]= "\u2020";
    t[135]= "\u2021";
    t[136]= "\u02c6";
    t[138]= "\u0160";
    t[139]= "\u2039";
    t[140]= "\u0152";
    t[142]= "\u017d";
    t[145]= "\u2018";
    t[146]= "\u2019";
    t[147]= "\u201c";
    t[148]= "\u201d";
    t[149]= "\u2022";
    t[150]= "\u2013";
    t[151]= "\u2014";
    t[152]= "\u02dc";
    t[153]= "\u2122";
    t[154]= "\u0161";
    t[155]= "\u203a";
    t[156]= "\u0153";
    t[158]= "\u017e";
    t[159]= "\u0178";
    
    return t;
  })();
  
  return toStr;
})();


function pad (s, l) {
  s= ""+ s;
  while (s.length < l) s= " "+ s;
  return s;
}


var buffer= new Buffer(256);
(256).times(function (i) { buffer[i]= i; });

var iso= buffer.toStr('iSo8859-1');
var win= buffer.toStr('wInDoWs-1252');
var utf= buffer.toStr('uTf8');

console.log("\rwin.length === iso.length : "+ (win.length === iso.length));
console.log("\rwin.length === utf.length : "+ (win.length === utf.length));
console.log("\riso.length === utf.length : "+ (iso.length === utf.length));

console.log('\r   win   iso   utf win iso utf\r');

[32,255].upto(function (i) {
  var c_win= win[i];
  var c_iso= iso[i];
  var c_utf= utf[i];
  
  var txt= "";
  txt+= pad(c_win.charCodeAt(0), 6);
  txt+= pad(c_iso.charCodeAt(0), 6);
  txt+= pad(c_utf.charCodeAt(0), 6);
  txt+= pad(c_win, 4);
  txt+= pad(c_iso, 4);
  txt+= pad(c_utf, 4);
  console.log(txt);
});
