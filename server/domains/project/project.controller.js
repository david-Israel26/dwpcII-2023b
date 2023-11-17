// Importando el logger de winston
import log from '../../config/winston';

// Importando el modelo
import ProjectModel from './project.model';

// Metodos de accion
// GET project/dashboard
const showDashboard = (request, response) => {
  response.send('🏗️ En construccion rutas para mostrar proyectos');
};

// GET project/add
const add = (request, response) => {
  response.render('project/addView');
};

// Consultando POST /project/add
const addPost = async (request, response) => {
  // Informacion de validacion - errorData
  const { errorData: validationError } = request;
  // En caso de error se informa
  if (validationError) {
    log.info('Se entrega al cliente error de validacion de add Project 🎟️');
    // Desestructuracion de los datos de validacion
    const { value: project } = validationError;
    // Reduciendo el objeto errorData
    const errorModel = validationError.inner.reduce((preview, current) => {
      // Creando una variable temporal para evitar el error
      // "no-param-reassing"
      const workingPrev = preview;
      workingPrev[`${current.path}`] = current.message;
      return workingPrev;
    }, {});
    return response
      .status(422)
      .render('project/addView', { project, errorModel });
  }
  // En caso de que pase la validacion se desestructura
  // la informacion de la peticion
  const { validData: project } = request;

  // Creando la instancia de un documento con valores de project
  const projectDocument = new ProjectModel(project);
  try {
    // Se guarda el documento en la coleccion correspondiente con 'save'
    const savedProject = await projectDocument.save();
    // Se contesta la informacion del proyecto al cliente
    log.info('Se entrega al cliente información del proyecto');
    return response.status(200).json(savedProject);
  } catch (error) {
    log.error('Error al guardar el proyecto en la base de datos');
    return response.status(500).json(error);
  }
};

// Controlador User
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
};
