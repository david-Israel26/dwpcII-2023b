// Estableciendo los modulos webpack
import webpack from 'webpack';
// Estableciendo los modulos webpack
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Libreria morgan
import morgan from 'morgan';
// Importando el debug a el archivo app.js
import debug from './services/debugLogger';
// Importando la configuracion del modulo webpack
import webpackConfig from '../webpack.dev.config';
// Importando el logger de winston
import log from './config/winston';
// Registro de middlwares de aplicacion
import indexRouter from './routes/index';
import usersRouter from './routes/users';

// Solo cargando dependencias
const createError = require('http-errors');
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Conexion de Winston con Morgan
app.use(morgan('dev', { stream: log.stream }));

// Se establecen los middlewares
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Crea un server de archivos estaticos-archivos css
app.use(express.static(path.join(__dirname, '..', 'public')));

//  Middlewares para enrutar con su enrutador
app.use('/', indexRouter);
//  Activa usersRouter cuando se solicita el recurso "/users"
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//  Middlware de error
app.use((req, res, next) => {
  log.info(`404 Pagina no encontrada ${req.method} ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  log.error(`${err.status || 500} - ${err.message}`);
  res.render('error');
});

export default app;
