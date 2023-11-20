// Importando manejo de sesiones
import ExpressSession from 'express-session';
// Importando soporto para mensajes flash
import ConnectFlash from 'connect-flash';
// Importando soporte para almacenamiento de sesiones
import MongoStore from 'connect-mongo';
// Importando la URL de la base de datos
import configKeys from './configKeys';

// Objeto de opciones
const options = {
  // Cadena de caracteres para firmar sesiones
  secret: 'awesome',
  // Indica si la sesion debe guardarse a pesar de no ser modificada
  resave: true,
  // Guardar la sesion a pesar de no ser inicializada
  saveUninitialized: true,
  // Objeto que almacena la sesion en mongodb
  // Usa connect-mongo y ttl es el tiempo de vida
  store: MongoStore.create({
    mongoUrl: configKeys.MONGO_URL,
    ttl: 1 * 24 * 60 * 60,
  }),
};

// Funcion que registra middlewares
// Exportando la funcion registradora
export default (app) => {
  // Creando el middleware
  const sessionsMiddleware = ExpressSession(options);
  // Registrando un middleware
  app.use(sessionsMiddleware);
  // Registramos middleware de mensajes flash
  app.use(ConnectFlash());
  // Middleware para rescatar los mensajes
  app.use((request, response, next) => {
    response.locals.successMessage = request.flash('successMessage');
    response.locals.errorMessage = request.flash('errorMessage');
    response.locals.infoMessage = request.flash('infoMessage');
    // Passport
    response.locals.passportError = request.flash('passportError');
    next();
  });
  return app;
};
