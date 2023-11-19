// Estableciendo los modulos webpack
import webpack from 'webpack';
// Estableciendo los modulos webpack
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importando mongoose
import mongoose from 'mongoose';
// Libreria morgan
import morgan from 'morgan';

// Importando method-override
import methodOverride from 'method-override';

// Importando template-engine
import configTemplateEngine from './config/templateEngine';

// Importando el debug a el archivo app.js
import debug from './services/debugLogger';
// Importando la configuracion del modulo webpack
import webpackConfig from '../webpack.dev.config';
// Importando el logger de winston
import log from './config/winston';
// Importando enrutador
import router from './router';

// Solo cargando dependencias
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Creando variable del directorio raiz
// eslint-disable-next-line
global["__rootdir"] = path.resolve(process.cwd());

// Creando la instancia de express
const app = express();

//  Modo de ejecucion
const nodeEnviroment = process.env.NODE_ENV || 'production';

// En caso que la aplicacion se ejecute en modo de desarrollo
// se realiza lo siguiente
if (nodeEnviroment === 'development') {
  // Mensaje de que se comienza a ejecutar el modo de desarrollo
  debug('Ejecutando en modo desarrollo 🛠️');
  // Estableciendo el entorno de node al modo de webpack
  webpackConfig.mode = nodeEnviroment;
  // Emparejando el puerto de webpack con el de node
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Se agrega el plugin de la configuracion de desarrollo de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Se crea el archivo bundle y se guarda en una constante
  const bundle = webpack(webpackConfig);
  // Permitiendo el uso del middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  //  Enabling the webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('Ejecutando en modo producción 🪖');
}

// Configurando el motor de plantillas
configTemplateEngine(app);

// Database connection checker Middleware
// Haciendo uso de app.use dando como parametro la base de los middleware request, response, next
app.use((request, response, next) => {
  // Haciendo uso de la propiead Connection.prototype.readyState
  // Asegurandonos que este conectada con el valor 1. (0=disconnected,1=connected,2=connecting)
  if (mongoose.connection.readyState === 1) {
    // Mostrar mensaje en el logger
    log.info('✅ Verificación de conexión a DB exitosa');
    // Pasar al siguiente middleware
    next();
  } else {
    // Renderiza una vista de error con el codigo 503 Service Unavailable
    response.status(503).render('errors/e503View', {
      url: 'https://i.postimg.cc/MKZsMhWQ/Arona.jpg',
      // Para evitar mostrar el layout main
      layout: 'errors',
    });
  }
});

// Conexion de Winston con Morgan
app.use(morgan('dev', { stream: log.stream }));

// Se establecen los middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Permitiendo verbos HTML post & delete
app.use(methodOverride('_method'));
// Crea un server de archivos estaticos-archivos css
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando rutas
router.addRoutes(app);

export default app;
