#!/usr/bin/env node
//201003xx jorge@jorgechamorro.com

var sys= require("sys");
var http= require("http");
var port= 12345;

function insideNode (n, hits) {
  var hits= 0;
  var pre= "<html>\n<head>\n<style type=\"text/css\">\n.link:hover {\ncursor:pointer;\n background-color:#ffc0c0;\n border:1px solid red;\n}\n.link {\n border:1px solid #e0e0e0;\n margin-top:0;\n margin-bottom:0;\n  }\n  .color1 {\n background-color:#f0f0ff;\n}\n.color2 {\n background-color:#e0e0ff;\n }</style>\n<title>JorgeChamorro Node.js Server</title>\n</head>\n<body>\n";
  var post= "</body></html>";
  var body= (function () {
    function v2 (objeto, nombre, cb) {
      var objetosObjeto= [];
      var objetosNombres= [];

      function resgistraObjeto (o, nombre) {

        if (nombre.indexOf("window.document") === 0) return;
        if (nombre.indexOf("window.clientInformation.mimeTypes") === 0) return;
        if (nombre.indexOf("window.clientInformation.plugins") === 0) return;
        if (nombre.indexOf("window.event") === 0) return;
        if (nombre.indexOf("window.navigator") === 0) return;
        //if (nombre.indexOf("window.console") === 0) return;

        var tipo= typeof o;

        //if (((tipo === "object") || (tipo === "function")) && (o !== null)) {
        if (o !== null) {
          var pos= objetosObjeto.indexOf(o);
          if (pos >= 0) return false;
          objetosObjeto.push(o);
          objetosNombres.push(nombre);
          if (!estaRegistrado(o, nombre)) {
            console.log("**** ERROR:"+ objetosObjeto.pop()+ ":"+ objetosNombres.pop());
            return false;
          }
          return true;
        }
      }

      function estaRegistrado (o, nombre) {
        return ((objetosObjeto.indexOf(o) >= 0) || (objetosNombres.indexOf(nombre) >= 0))
      }

      function recorre (e) {
        var o= e[0];
        var nombre= e[1];
        var tipo= typeof o;

        if (((tipo === "object") || (tipo === "function")) && (o !== null)) {
          var keys= [];

          try {
            keys= Object.getOwnPropertyNames(o);
            for (var p in o) {
              keys.push(p);
            }
          } catch (e) {
            for (var p in o) {
              keys.push(p);
            }
          }

          keys.push("__proto__");

          while (keys.length) {
            var subNombre= keys.shift();
            resgistraObjeto(o[subNombre], nombre+"."+subNombre);
          }
        }
      }

      resgistraObjeto(objeto, nombre);
      var i= 0;
      while (i < objetosObjeto.length) {
        recorre([objetosObjeto[i], objetosNombres[i]]);
        i++;
      }

      var i= objetosObjeto.length;
      var o= [];
      while (i--) {
        o.push({
          o: objetosObjeto[i],
          n: objetosNombres[i]
        });
      }
      objetosObjeto= objetosNombres= null;
      o.sort(function (a,b) {
        a= a.n.toLowerCase();
        b= b.n.toLowerCase();
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
      return o;
    }

    function pad (n, digitos) {
      n+= "";
      while (n.length < digitos) {
        n= "0"+ n;
      }
      return n;
    }

    function cb (obj) {
      var e, i= 0;
      var html= "";
      var digitos= (""+ obj.length).length;
      while (i < obj.length) {
      var txt= "["+ pad(i, digitos) + "] ";
        var o= obj[i];
        switch (typeof o.o) {

          case "object":
          txt+= o.n+ ": ["+ (typeof o.o)+ "]";
          break;

          case "function":
          txt+= o.n+ ": ["+ (typeof o.o)+ "] : "+ o.o;
          break;

          default:
          txt+= o.n+ ": ["+ (typeof o.o)+ "] : "+ o.o;
        }
        html+= (i % 2) ? ("<pre class='link color1'>"+ txt+ "</pre>") : ("<pre class='link color2'>"+ txt+ "</pre>");
        i++;
      }
      return html;
    }

    return cb(v2(global,"global"));
  })();

  return function (request, response) {
    var time= +new Date();
    
    if (request.url === "/favicon.ico") {
      response.writeHeader(404, {});
    } else {
      hits++;
      response.writeHeader(200, {"Content-Type": "text/html", "server":"Node.js"});
      response.write(pre+ body);
    }
    
    var txt= "puerto:"+ n + ", hits:"+ hits+ ", url:"+ request.url+ ", tiempo:"+ (((+ new Date())-time)/1000).toFixed(3)+ "s";
    response.write("<br>"+ txt+ post);
    response.close();
    //sys.puts(txt);
  };
}

http.createServer(insideNode(port)).listen(port);
sys.puts("Server running at http://localhost:"+ port+ "/");