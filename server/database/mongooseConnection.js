// Importando logger
import mongoose from 'mongoose';
import log from '../config/winston';

// Funcion de conexion
export default async function connectWithRetry(mongoUrl) {
  try {
    await mongoose.connect(mongoUrl);
    log.info('Conectado a MongoDB');
  } catch (error) {
    log.error(`No se logro la conexion a la db: ${error.message}`);
    log.error('Intentando la conexion en 20 seg');
    setTimeout(() => connectWithRetry(mongoUrl), 2000);
  }
}
