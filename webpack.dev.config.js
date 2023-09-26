//Importar el administrador de archivos llamado path
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Exportacion del objeto de configuracion usado por el webpack
module.exports= {
    //Archivo de entrada
    entry: "./client/index.js",
    //Cual sera el archivo de salida
    output: {
        //Ruta absoluta de salida
        path: path.resolve(__dirname,"public"),
        //Nombre del archivo de salida
        filename: "bundle.js"
    },
    //Configuracion de servidor de desarrollo
    devServer: {
        //Folder de archivos estaticos
        static: path.join(__dirname,"public"),
        //Definiendo el puerto del servidor
        port: 8080,
        //Definiendo el host
        host: "0.0.0.0"
    },
    //Agregando un modulo a webpack
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_componentes)/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': false,
                                        'useBuiltIns': 'usage',
                                        'targets': '> 0.25%,not dead',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins:[new MiniCssExtractPlugin({
        filename:'styles/app.css'
    })]
}