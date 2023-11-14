// Importando el logger de winston
import log from '../../config/winston';

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
const addPost = (request, response) => {
  // Informacion de validacion - errorData
  const { errorData: validationError } = request;
  // En caso de error se informa
  if (validationError) {
    log.info('Se entrega al cliente error de validacion de add Project 🎟️');
    response.status(422).json(validationError);
  } else {
    // En caso de pasar la informacion
    // Desestructurando la informacion
    const { validData: project } = request;
    // Se contesta la informacion en forma json
    response.status(200).json(project);
  }
};

// Controlador User
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
};
