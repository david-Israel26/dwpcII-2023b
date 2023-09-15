//Importanto el modulo path
const path = require('path');

//Exportamos un objeto de configuración Configuration Options Object
module.exports = {
    //-> Estableciendo el modo de produccion
    mode: 'production',
    //Estableciendo el archivo indexador del front-end
    entry: "./client/index.js",
    //Estableciendo el archivo de salida
    output: {
        //Ruta absoluta de salida
        path: path.resolve(__dirname, "public"),
        //Nombre del archivo de salida
        filename: "bundle.js",
    }
}