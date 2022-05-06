// Importacion de modulos
const url = require("url");
const http = require("http");
const fs = require("fs");
const PORT = 3000;

// Se almacena en en una constante server el módulo "http" para posteriormente poder ser exportado
// al archivo donde se realizará el test.
const server = http
  .createServer(function (req, res) {
    // Ruta Raiz
    if (req.url == "/") {
      res.setHeader("content-type", "text/html");
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data);
      });
    }
    // 1. Crear una ruta que al consultarse devuelva en formato JSON todos los deportes registrados.
    if (req.url == "/deportes") {
      fs.readFile("deportes.json", "utf8", (err, data) => {
        res.end(data);
      });
    }
    // 2. Ruta POST que recibe el nombre y precio de un nuevo deporte, lo persiste en un archivo JSON. Se genera una respuesta en caso de no recibir ambos valores en la consulta.
    if (req.url.startsWith("/agregar")) {
      const { nombre, precio } = url.parse(req.url, true).query;
      fs.readFile("deportes.json", "utf8", (err, data) => {
        if (nombre === "" || precio === "")
          return res.end("Debes indicar nombre y precio.");
        let deportes = JSON.parse(data).deportes;
        deportes.push({
          nombre,
          precio,
        });

        fs.writeFile("deportes.json", JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(" oh oh...") : console.log(" OK ");
          res.end("Deporte agregado con exito");
        });
      });
    }
    // 3. Crear una ruta que edite el precio de un deporte registrado utilizando los parámetros de la consulta y persista este cambio.
    if (req.url.startsWith("/editar")) {
      const { nombre, precio } = url.parse(req.url, true).query;
      fs.readFile("deportes.json", "utf8", (err, data) => {
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.map((d) => {
          if (d.nombre == nombre) {
            d.precio = precio;
            return d;
          }
          return d;
        });
        fs.writeFile("deportes.json", JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(" oh oh...") : console.log(" OK ");
          res.end("Deporte editado con exito");
        });
      });
    }
    // 4. Crear una ruta que elimine un deporte solicitado desde el cliente y persista este cambio.
    if (req.url.startsWith("/eliminar")) {
      const { nombre } = url.parse(req.url, true).query;
      fs.readFile("deportes.json", "utf8", (err, data) => {
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.filter((d) => d.nombre !== nombre);
        fs.writeFile("deportes.json", JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(" oh oh...") : console.log(" OK ");
          res.end("Deporte elimado con exito");
        });
      });
    }
  })
  .listen(PORT, console.log(`Server ON, PORT ${PORT}`));

  // Se exporta el servidor
module.exports = server;
