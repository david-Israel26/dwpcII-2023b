/* eslint-disable import/no-duplicates */
// Importando el logger de winston
import log from '../../config/winston';
import projectModel from './project.model';

// Importando el modelo
import ProjectModel from './project.model';

// Metodos de accion
// GET project/showDashboard
const showDashboard = async (request, response) => {
  // Consultando todos los proyectos
  const projects = await ProjectModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  response.render('project/dashboardViews', { projects });
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
    // Se informa al cliente del guardado del proyecto
    log.info(`Se carga el proyecto ${savedProject}`);
    log.info('Se redirecciona al cliente a la ruta /project');
    // Se redirecciona el sistema a la ruta '/project'
    return response.redirect('/project/showDashboard');
  } catch (error) {
    log.error('Error al guardar el proyecto en la base de datos');
    return response.status(500).json(error);
  }
};

// Formulario de edicion por ID
// GET '/project/edit/:id'
const edit = async (request, response) => {
  // Se extrae el id de los parametros
  const { id } = request.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del proyecto con el id:${id}`);
    const project = await projectModel.findOne({ _id: id }).lean().exec();
    if (project === null) {
      log.info(`No se encontro el proyecto con el id:${id}`);
      return response
        .status(404)
        .json({ fail: `No se encontro el proyecto con el id: ${id}` });
    }
    // De lo contrario se manda a renderizar la vista de edicion
    log.info(`Proyecto encontrado con el id:${id}`);
    return response.render('project/editView', { project });
  } catch (error) {
    log.error('Ocurrio un error en el metodo error de project.controller');
    return response.status(500).json(error);
  }
};

// Actualizar el proyecto
const editPut = async (request, response) => {
  const { id } = request.params;
  const { errorData: validationError } = request;
  if (validationError) {
    log.info(`Error de validacion del proyecto con id:${id}`);
    const { value: project } = validationError;
    const errorModel = validationError.inner.reduce((preview, current) => {
      const workingPrev = preview;
      workingPrev[`${current.path}`] = current.message;
      return workingPrev;
    }, {});
    return response
      .status(422)
      .render('project/editView', { project, errorModel });
  }
  // Si no hay error
  const project = await ProjectModel.findOne({ _id: id });
  if (project === null) {
    log.info(`No se encontro documento para actualizar con id:${id}`);
    return response
      .status(400)
      .send(`No se encontro documento para actualizar con id:${id}`);
  }
  // En caso de no existir error se actualizan los datos
  const { validData: newProject } = request;
  project.name = newProject.name;
  project.description = newProject.description;
  try {
    // Se salvan los cambios
    log.info(`Actualizando proyecto con ID:${id}`);
    await project.save();
    return response.redirect(`/project/edit/${id}`);
  } catch (error) {
    log.error(`Error al actualizar el proyecto con el ID:${id}`);
    return response.status(500).json(error);
  }
};

// Controlador User
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
  edit,
  editPut,
};
