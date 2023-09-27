//Solo cargando dependencias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Importando el debug a el archivo app.js
import debug from './services/debugLogger';

//Registro de middlwares de aplicacion
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Estableciendo los modulos webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importando la configuracion del modulo webpack
import webpackConfig from '../webpack.dev.config';
///***/

//Creando la instancia de express
var app = express();

//Modo de ejecucion
const nodeEnviroment = process.env.NODE_ENV || 'production'

// En caso que la aplicacion se ejecute en modo de desarrollo
// se realiza lo siguiente
if(nodeEnviroment === 'development'){
  // Mensaje de que se comienza a ejecutar el modo de desarrollo
  debug("Ejecutando en modo desarrollo 🛠️");
  // Estableciendo el entorno de node al modo de webpack
  webpackConfig.mode = nodeEnviroment;
  // Emparejando el puerto de webpack con el de node
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
	// Se agrega el plugin de la configuracion de desarrollo de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Se crea el archivo bundle y se guarda en una constante
  const bundle = webpack(webpackConfig);
  // Permitiendo el uso del middleware
  app.use( WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }) );
  //  Enabling the webpack HMR
  app.use( WebpackHotMiddleware(bundle) );
}else{
  console.log("Ejecutando en modo producción 🪖");
}

// Configurando el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Se establecen los middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Crea un server de archivos estaticos-archivos css
app.use(express.static(path.join(__dirname,'..','public')));

//Middlewares para enrutar con su enrutador
app.use('/', indexRouter);
//Activa usersRouter cuando se solicita el recurso "/users"
app.use('/users', usersRouter);

//Mi propio middleware con su request response
//app.use('/author', (request,response) => {
//  response.json({mainDeveloper: "David González"});
//});

// catch 404 and forward to error handler
//Middlware de error
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
