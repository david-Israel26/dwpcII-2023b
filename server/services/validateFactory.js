// Importando el logger de winston
// import log from '../config/winston';

// Patron Factory
// Creando arrow function validation
// Funcion que regresa una funcion
// Parametros schema, getObject
const Validator =
  ({ schema, getObject }) =>
  // Funcion asincrona
  async (req, _, next) => {
    // Objeto de validacion
    const dataObject = getObject(req);
    // El proceso de validacion en un bloque try catch
    try {
      // Se valida el objeto, de ser correcto se envia
      // El siguiente mensaje al logger
      // log.info(`Inicia la validación de Project: ${typeof schema}`);
      const validData = await schema.validate(dataObject, {
        abortEarly: false,
      });
      // log.info('Pasa la validación de Project');
      // Inyectando el objeto validado en la peticion
      req.validData = validData;
    } catch (error) {
      // log.info(`Falla la validación de Project: ${error}`);
      req.errorData = error;
    }
    // Se invoca al siguiente middleware de la cadena
    return next();
  };
// Exportando el validador
export default Validator;
