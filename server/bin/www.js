#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
// import debug from '../services/debugLogger';
import app from '../app';

// Importando a winston logger
import log from '../config/winston';

/**
 * Get port from environment and store in Express.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const secondport = parseInt(val, 10);

  if (Number.isNaN(secondport)) {
    // named pipe
    return val;
  }

  if (secondport >= 0) {
    // port number
    return secondport;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
log.info('El servidor es creado desde la instancia de express');
const server = http.createServer(app); // app tiene la forma (request,response) => {...}

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  log.info(`👂📣Listening on port:${addr.port}`);
}

server.listen(port);
// Registrando eventos del servidor
// Evento error - variable - funcion callback
server.on('error', onError);
server.on('listening', onListening);
