// Importando la creacion de errores
import createError from 'http-errors';
// Importando enrutador home
import homeRouter from './domains/home/home.router';
// Import winston logger
import log from './config/winston';

// Funcion que agrega rutas
const addRoutes = (app) => {
  // Agregando enrutador de Home
  app.use('/', homeRouter);

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

  return app;
};

// Exportando el objeto
export default { addRoutes };
