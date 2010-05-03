var sys= require("sys");
var http= require("http");
var port= 12345;

function insideNode (n, hits) {
  hits= 0;
  return function (request, response) {
    var body= "", pre= "", props= [];
    var time= +new Date();

    function expandir (o, nombre, prefijo, sufijo) {
      var n, linea;
      var tipo= typeof o;
      if (tipo === "object") {
        if (({}).toString.call(o).toLowerCase().indexOf('array') >= 0) {
          tipo= "array";
        }
      }
      if ((tipo === "object") || (tipo === "function") || (tipo === "array")) {
        n= props.indexOf(o);
        if (n >= 0) {
          //Ya se ha expandido anteriormente
          linea= "<td><a href=\"#o"+ n+ "\">."+ nombre+ "</a></td><td>["+ tipo+ "]: "+ o+ "</td>";
          body+= "<tr>"+ prefijo+ linea+ sufijo+ "</tr>";
          return;
        }

        n= props.push(o)- 1;
        linea= "<td id=\"o"+ n+ "\">."+ nombre+ "</td><td>["+ tipo+ "]: "+ o+ "</td>";
        body+= "<tr>"+ prefijo+ linea+ sufijo+ "</tr>";
        linea= "<td><a href=\"#o"+ n+ "\">."+ nombre+ "</a></td>";

        try {
          var keys= Object.getOwnPropertyNames(o);
        } catch (e) {
          keys= [];
        }
        keys.sort(function (a,b) {
          return 1- (2* (a < b));
        });
        for (var q in keys) {
          expandir(o[keys[q]], keys[q], prefijo+ linea, sufijo);
        }
      } else {
        linea= "<td>."+ nombre+ "</td><td>["+ tipo+ "]: "+ o+ "</td>";
        body+= "<tr>"+ prefijo+ linea+ sufijo+ "</tr>";
      }
    }

    if (request.url === "/favicon.ico") {
      response.writeHeader(404, {});
    } else {
      hits++;
      response.writeHeader(200, {"Content-Type": "text/html", "server":"Node.js"});
      var pre= "<html>\n<head>\n<style type=\"text/css\">\ntd {\n font-family:monospace;\n border:1px solid red;\n}\ntable {\n margin-top:30px;\n width:100%;\n }\n</style>\n<title>JorgeChamorro Node.js Server</title>\n</head>\n<body>\n<h1>";
      body= "</h1><br>\n<table>\n";
      expandir((function(){return this;})(), "global", "\n", "");
      body+= "\n</table>\n</body>\n</html>";
    }
    var txt= "puerto:"+ n + ", hits:"+ hits+ ", url:"+ request.url+ ", tiempo:"+ (((+ new Date())-time)/1000).toFixed(3)+ "s";
    response.write(pre+ txt+ body);
    response.close();
    //sys.puts(txt);
  };
}

http.createServer(insideNode(port)).listen(port);
sys.puts("Server running at http://localhost:"+ port+ "/");
