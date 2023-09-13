//Importanto el modulo path
const path = require('path');

//Exportamos un objeto de configuración Configuration Options Object
module.exports = {
    //Estableciendo el archivo indexador del front-end
    entry: "./client/index.js",
    //Estableciendo el archivo de salida
    output: {
        //Ruta absoluta de salida
        path: path.resolve(__dirname, "public"),
        //Nombre del archivo de salida
        filename: "bundle.js",
        //Ruta base de archivos estaticos
        publicPath: "/"
    },
    //Servidor de desarrollo
    devServer: {
        //Configurando el folder de estaticos
        static: path.join(__dirname,"public"),
        //Configurando el puerto del servidor de desarrollo
        port: 8080,
        //Host
        host: '0.0.0.0'
    }
}