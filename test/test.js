// Importar módulos
const chai = require('chai');
// 01 Paquete chai--http
const chaiHttp = require('chai-http');
// 02 importar el servidor.
const server = require('../index.js');
// 03 plugin de "chai-http" usando metodo "use" del paquete "chai", como parametro
// la isntancia del paquete "chai-http"
chai.use(chaiHttp)
// 04 Crear un "suite" de test y un test unitario con las descripciones correspondientes
describe('Probando API REST con Mocha-Chai', () => {
    it('Probando que la ruta /deportes devuelve un json con la propiedad deportes y esta debe ser un arreglo', () => {
        // 05 Utilizar método "chai" "request" pasandole como parametro el servidor.
        chai
            .request(server)
            // 06 conacatenar el metodo "get" pasandole como parámetro la ruta que quieres testear del servidor
            .get('/deportes')
            // 07 Concatenar el método "end", se rrecibe como parametro una función callback "err"  y "data" de la consulta del servidor.
             .end( () => (err, res) => {
                // 08 Almacenar en una variable la data de la respuesta en su prop. "text" parseada con el JSON.parse()
                let data = JSON.parse(res.text)
                // 09 utilizar el método "expect" de la instancia "chai" pasandole la data,
                chai.expect(data).to.have.property('deportes')
                // 10 
                chai.expect(data.deportes).to.be.an('array')
            }) 
    })
})
