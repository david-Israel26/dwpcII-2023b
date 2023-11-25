// Importando el logger de winston
import log from '../../config/winston';
// Importando el modelo de Usuario
import User from './user.model';

// Metodos de accion
// GET "user/login"
const login = (request, response) => {
  log.info('Sirviendo el formulario de login');
  response.render('user/login');
};

// GET "user/logout"
const logout = (request, response) => {
  response.send("👍CHAMBEANDO EN ESTA RUTA '/user/logout' 🍻");
};
// GET "user/register"
const register = (request, response) => {
  log.info('Enviando el formulario de registro');
  response.render('user/register');
};

// Estableciendo el metodo POST para registros
const registerPost = async (request, response) => {
  // Renombrar la variable que contiene los datos del usuario
  // validData pasa a ser userFormData
  const { validData: userFormData, errorData } = request;
  log.info('Se procesa el formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return response.json(errorData);
  }
  // En caso de no existir errores creamos el usuario
  try {
    // 1._ Se crea una instancia del modelo User mediante la funcion create
    const user = await User.create(userFormData);
    log.info(`Usuario Creado: ${JSON.stringify(user)}`);
    // 2._ Se contesta al cliente con el usuario creado
    return response.status(200).json(user.toJSON());
  } catch (error) {
    log.error(error);
    return response.json({
      message: error.message,
      name: error.name,
      errors: error.errors,
    });
  }
};

// Controlador Login
export default {
  login,
  logout,
  register,
  registerPost,
};
