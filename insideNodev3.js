<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>untitled</title>
  <meta name="generator" content="TextMate http://macromates.com/">
  <meta name="author" content="Jorge">
  <!-- Date: 2010-03-24 -->
  <style type="text/css">
  .link:hover {
    background-color: black;
    cursor:pointer;
    background-color:#ffc0c0;
    border:1px solid red;
  }
  .link {
    border:1px solid #e0e0e0;
    margin-top:0;
    margin-bottom:0;
  }
  .color1 {
    background-color:#f0f0ff;
    color:#101010;
  }
  .color2 {
    background-color:#a0a0a0;
    color:#f0f0ff;
  }
  </style>
  <script>
  window.onload= function () {
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
    
    function cb (obj) {
      var e, i= 0;
      var html= "";
      while (i < obj.length) {
      var txt= "";
        var o= obj[i];
        switch (typeof o.o) {
          
          case "object":
          txt= o.n+ ": ["+ (typeof o.o)+ "]";
          break;
          
          case "function":
          txt=  o.n+ ": ["+ (typeof o.o)+ "] : "+ o.o;
          break;
          
          default:
          txt=  o.n+ ": ["+ (typeof o.o)+ "] : "+ o.o;
        }
        html+= (i % 2) ? ("<pre class='link color1'>"+ txt+ "</pre>") : ("<pre class='link color2'>"+ txt+ "</pre>");
        i++;
      }
      return html;
    }
    
    document.body.innerHTML= cb(v2(window,"window"));
  };
  </script>
</head>
<body>

</body>
</html>
